<?php

declare(strict_types=1);

namespace App\Traits;

# Vendor Packages
use Exception;

# WordPress
use WP_Error;
use WP_HTTP_Response;
use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WC_Product_Query, WP_Query;
use is_wp_error,wp_insert_post;

use function rest_ensure_response;

trait PostTrait{


#-----------------------------------------------------------------
#  Get Custom posts
#-----------------------------------------------------------------

     public function getPosts($args){
        $posts = get_posts($args);
        $data = array(); 
        foreach ($posts as $post) { 
            $data[] = $this->postRecord($post);
        }
        return $data;
     }


     public function postRecord($post){
        $custom_fields = get_fields($post->ID); // Get custom fields associated with the post
        $comment_count = wp_count_comments( $post->ID );
        $blog = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'created_at' => [
               'full' =>$post->post_date,
               'day' => date('d',strtotime($post->post_date)),
               'month' => date('M',strtotime($post->post_date)),
               'year' => date('Y',strtotime($post->post_date)),
            ],
            'slug' => $post->post_name,
            'content' => $post->post_content,
            'custom_fields' => $custom_fields, // Include custom fields in the response
            'thumbnail' => get_the_post_thumbnail_url($post->ID), // Get the thumbnail URL
            'post' => $post,
            'comment_count' => $comment_count
        );

        // if(!empty($author)){ 
        $author_id = $post->post_author;
        $author_name = get_the_author_meta('display_name', $author_id); // Retrieve author display name 
        // Include author details in the response
        $blog['author'] = array(
            'id' => $author_id,
            'name' => $author_name
        );
        //} 
        return $blog;
     }
#-----------------------------------------------------------------
#  Get Recent posts
#-----------------------------------------------------------------

    public function getRecentPosts($args){
            $posts_query = new WP_Query( $args ); 
            $posts = $posts_query->posts; // Extract post IDs from the query results 
            $data = array(); 
            foreach ( $posts as $post_id ) {
                $post_title = get_the_title( $post_id ); // Get post title
                $post_slug = get_post_field( 'post_name', $post_id ); // Get post slug 
                $post_data = array(
                    'title' => $post_title,
                    'slug'  => $post_slug,
                ); 
                $data[] = $post_data;
            }
        return $data;
    }
#-----------------------------------------------------------------
#  Get Recent posts
#-----------------------------------------------------------------

public function getPost($post_id,$limit=10){
     
    $post = get_post($post_id); 
    if ( ! $post ) {
        return [];
    }
    // $comment_count = wp_count_comments( $post_id );
    // Construct response data for the post
    $post_data = $this->postRecord($post); 
    // Get comments for the post
    $comments = get_comments( array( 'post_id' => $post->ID,  'parent' => 0,'status' => 'approve','number' => $limit ) );


    // Construct response data for comments
    $comments_data = array();
    foreach ( $comments as $comment ) {
            $author_id = $comment->user_id;
            $author_picture = get_avatar_url( $comment->comment_author_email );
            $comment_date = $comment->comment_date;
            $author_name = get_comment_author( $comment->comment_ID );
            $comment_data = array(
                'id' => $comment->comment_ID,
                'author' => array(
                    'id' => $author_id,
                    'picture' => $author_picture,
                    'name' => $author_name
                ),
                'content' => $comment->comment_content,
                'date' => $comment_date,
                'created_at' => [
                    'full' =>$comment_date,
                    'day' => date('d',strtotime($comment_date)),
                    'month' => date('M',strtotime($comment_date)),
                    'year' => date('Y',strtotime($comment_date)),
                 ],
            ); 

            // Get replies for the comment
            $replies = get_comments( array( 'parent' => $comment->comment_ID, 'status' => 'approve' ) );

            // Construct response data for replies
            $replies_data = array();
            foreach ( $replies as $reply ) {
                
                $author_id = $reply->user_id;
                $author_picture = get_avatar_url( $reply->comment_author_email );
                $author_name = get_comment_author( $reply->comment_ID );
                $reply_date = $reply->comment_date;

                    $reply_data = array(
                        'id' => $reply->comment_ID,
                        'author' => [
                            'id' => $author_id,
                            'picture' => $author_picture,
                            'name' => $author_name
                        ],
                        'content' => $reply->comment_content,
                        'date' => $reply_date,
                        'created_at' => [
                            'full' =>$reply_date,
                            'day' => date('d',strtotime($reply_date)),
                            'month' => date('M',strtotime($reply_date)),
                            'year' => date('Y',strtotime($reply_date)),
                         ],
                        // Add more comment data as needed
                    );
                $replies_data[] = $reply_data;
            }
            // Add replies to comment data
            $comment_data['replies'] = $replies_data;

        $comments_data[] = $comment_data;
    }
    // Combine post data and comments data
    return $response_data = array(
        'post' => $post_data,
       
        'comments' => $comments_data,
    );
    
}



#-------------------------------------------------------------------------
# Save Comments and replies 
#-------------------------------------------------------------------------
// Callback function to save comments and replies
function save_comment($post_id,$content,$user_id,$parent_comment=0) {
    // Get the current user object
   
    // $current_user = wp_get_current_user();

    // // If the current user is not logged in, return an error response
    // if ( $current_user->ID == 0 ) {
    //     return new WP_REST_Response( array( 'message' => 'User not logged in.' ), 401 );
    // }
    $user = get_userdata( $user_id );
    $user_name = $user->user_login; // Username
    $user_email = $user->user_email; // Email
    $user_display_name = $user->display_name; // Display Name

    // Prepare comment data
    $commentdata = array(
        'comment_post_ID' => $post_id,
        'comment_author' => $user_display_name, // Use current user's display name as the author
        'comment_author_email' => $user_email,
        'comment_content' => $content,
        'comment_parent' => $parent_comment,
    );

    // Insert the comment
    $comment_id = wp_insert_comment( $commentdata );

    if ( is_wp_error( $comment_id ) ) {
        return new WP_REST_Response( array( 'message' => 'Failed to save comment.' ), 500 );
    }

    return new WP_REST_Response( array( 'message' => 'Comment saved successfully.', 'comment_id' => $comment_id ), 200 );
}



#---------------------------------------------------------------------------------
#  Conatct Us 
#---------------------------------------------------------------------------------

public function saveContactUs($request){ 
    $name = $request->get_param('first_name').' '.$request->get_param('last_name');
    $email = $request->get_param('email');
    $phone = $request->get_param('phone');
    $message = $request->get_param('message');

    global $wpdb;
     $table_name = $wpdb->prefix . 'custom_enquiries';

     $result = $wpdb->insert($table_name, array(
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        
        'question' => $message, 
        'enquiry_type' => 'contact-us',
    ));

    if (!$result) { 
        return new WP_Error('form_submission_error', 'Failed to insert data into the database', array('status' => 400));
    }  
    return new WP_REST_Response(array('message' => 'Form submission saved.'), 200); 
}

#---------------------------------------------------------------------------------
#  Get a quote
#---------------------------------------------------------------------------------

public function getQuoteSave($request){ 
    $name = $request->get_param('fname').' '.$request->get_param('lname');
    $email = $request->get_param('email');
    $phone = $request->get_param('phone');
    $message = $request->get_param('comments');
    $address = $request->get_param('address');
    $city = $request->get_param('city');
    $company_name = $request->get_param('company_name');
    $state = $request->get_param('state');
    $pincode = $request->get_param('zip_code');
    $product_id = $request->get_param('product_id'); 

    global $wpdb;
     $table_name = $wpdb->prefix . 'custom_enquiries';

     $result = $wpdb->insert($table_name, array(
        'name' => $name,
        'email' => $email,
        'phone' => $phone, 
        'question' => $message, 
        'company_address' => $address, 
        'city_name' => $city, 
        'state_name' => $state,  
        'pincode' => $pincode, 
        'company_name' => $company_name,  
        'product_id' => $product_id,
        'enquiry_type' => 'get-a-quote',
    ));

    if (!$result) { 
        return new WP_Error('form_submission_error', 'Failed to insert data into the database', array('status' => 400));
    }  
    return new WP_REST_Response(array('message' => 'Quote request has been sent successfully!.'), 200); 
}

}
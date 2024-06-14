<?php

if (!class_exists('WP_List_Table')) {
    require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

class Custom_Form_Data_List_Table extends WP_List_Table {
    function __construct() {
        parent::__construct(array(
            'singular' => 'form_data',
            'plural'   => 'form_data',
            'ajax'     => false
        ));
    }

    function get_columns() {
        $columns = array(
            'cb'      => '<input type="checkbox" />',
            'name'    => 'Name',
            'email'   => 'Email',
        );
        return $columns;
    }

    function column_cb($item) {
        return sprintf('<input type="checkbox" name="form_data[]" value="%s" />', $item['id']);
    }

    function column_default($item, $column_name) {
        switch ($column_name) {
            case 'name':
            case 'email':
                return $item[$column_name];
            default:
                return print_r($item, true);
        }
    }

    function get_sortable_columns() {
        $sortable_columns = array(
            'name'  => array('name', false),
            'email' => array('email', false),
        );
        return $sortable_columns;
    }

    function prepare_items() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'custom_enquiries';

        $per_page     = 20;
        $current_page = $this->get_pagenum();
        $total_items  = $wpdb->get_var("SELECT COUNT(id) FROM $table_name");

        $this->set_pagination_args(array(
            'total_items' => $total_items,
            'per_page'    => $per_page,
            'total_pages' => ceil($total_items / $per_page)
        ));

        // $this->items = $wpdb->get_results($wpdb->prepare(
        //     "SELECT * FROM $table_name LIMIT %d OFFSET %d",
        //     $per_page,
        //     ($current_page - 1) * $per_page
        // ), ARRAY_A);
    }
}

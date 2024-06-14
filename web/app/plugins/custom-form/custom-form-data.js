jQuery(document).ready(function($) {
    var table = $('#custom-form-data-table').DataTable();
    $('#custom-form-filters').on('submit', function(e) {
        e.preventDefault();

        fetchEnquiries();
    });

    fetchEnquiries();


    function fetchEnquiries(){
        var data = {
            action: 'fetch_custom_form_data',
            nonce: custom_form_data_ajax.nonce,
            type: $('#filter_type').val(), 
        };

        $.post(custom_form_data_ajax.ajax_url, data, function(response) {
            if (response.success) {
                table.clear();

                if($('#filter_type').val() == "contact-us"){
                    $.each(response.data, function(index, item) {
                        table.row.add([
                            item.name,
                            item.email,
                            item.phone, 
                            item.question
                        ]).draw();
                    });
                }else if($('#filter_type').val() == "get-a-quote"){
                    $.each(response.data, function(index, item) {
                        table.row.add([
                            item.name,
                            item.email,
                            item.phone, 
                            item.company_name,
                            item.company_address,
                            item.city_name,
                            item.state_name,
                            item.pincode, 
                            item.question

                        ]).draw();
                    });
                }
               
            } else {
                alert('Failed to fetch data.');
            }
        });
    }
});

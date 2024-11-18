jQuery(Document).ready(function() {
    jQuery(Document).on("submit", "#insert", function(){
        event.preventDefault();
        let sno = jQuery('#sno').val();
        let pno = jQuery('#pno').val();
        let qty = jQuery('#qty').val();
        let price = jQuery('#price').val();

        jQuery.ajax({
            url: '/insert',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "sno": sno,
                "pno": pno,
                "qty": qty,
                "price": price
            }),
            success: function(response){
                alert("Data submitted successfully!");
            },
            error: function(xhr) {
                alert(`ERROR: ${xhr.responseJSON.error}`);
            }
        });
    })

    jQuery(".increase").click(function() {
        let sno = this.id
        jQuery.ajax({
            url: '/increase',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "sno": sno
            }),
            success: function (){
                alert(`Status for ${sno} increased by 10%!`);
            },
            error: function (xhr) {
                alert(`ERROR: ${xhr.responseJSON.error}`);
            }
        })
    });
});
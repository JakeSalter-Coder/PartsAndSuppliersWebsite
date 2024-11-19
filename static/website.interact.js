jQuery(Document).ready(function() {
    jQuery(Document).on("submit", "#insert", function(event){
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
    });

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
        });
    });

    jQuery('#display_all').click(function() {
        jQuery.get('/display-all', function(data) {
            let dynamic_table = jQuery('#all_suppliers');
            if(dynamic_table.empty()) {
                dynamic_table.append(
                    "<tr>" +
                        "<th>Sno</th><th>Sname</th><th>Status</th><th>City</th>" +
                    "</tr>"
                );
                for (const row of data['suppliers']) {
                    dynamic_table.append(
                        "<tr>" +
                            `<td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td>` +
                        "</tr>"
                    );
                }
            }
        });
    });

    jQuery(Document).on("submit", "#get-supplier", function(event){
        event.preventDefault();
        let pno = jQuery('#get-pno').val();
        jQuery.ajax({
            url: '/supplier',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "pno": pno
            }),
            success: function(response){
                let dynamic_supplier = jQuery('#show_pno');
                dynamic_supplier.empty();
                dynamic_supplier.append(
                    "<tr>" +
                        "<th>Sno</th><th>Sname</th><th>Status</th><th>City</th>" +
                    "</tr>"
                )
                for(const row of response.suppliers){
                    dynamic_supplier.append(
                        "<tr>" +
                            `<td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td>` +
                        "</tr>"
                    )
                }
            },
            error: function(xhr) {
                alert(`ERROR: ${xhr.responseJSON.error}`);
            }
        });
    });
});
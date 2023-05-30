/*Bu kod, jQuery ve AJAX kullanarak form doğrulama ve göndermeyi işleyen bir JavaScript işlevidir. 
Form alanlarını doğrulamak ve varsayılan form gönderme davranışını önlemek için jqBootstrapValidation eklentisini kullanır.
Form gönderildiğinde, işlev form alanlarının değerlerini alır ve bunları bir AJAX isteği kullanarak 
"././mail/contact_me.php" adresinde bulunan bir PHP betiğine gönderir. PHP betiği, form verilerini işler ve JavaScript işlevine bir yanıt gönderir.
Yanıt bir hata içeriyorsa işlev, posta sunucusunun yanıt vermediğini belirten bir mesaj görüntüler ve form alanlarını temizler.
 Yanıt başarıyı gösteriyorsa işlev bir başarı mesajı görüntüler ve form alanlarını temizler.
Kod ayrıca, kullanıcı "ad" alanını tıkladığında tüm başarı veya hata mesajlarını temizleyen bir olay dinleyicisi içerir. */
$(function() {
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
           // ek hata mesajları veya olaylar
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // varsayılan gönderme davranışını engelle
            // FORM'dan değerler alır.
            var name = $("input#user-name").val();
            var lastname = $("input#user-lastname").val();
            var email = $("input#user-email").val();
            var phone = $("input#user-phone").val();
            var subject = $("input#user-subject").val();
            var message = $("textarea#user-message").val();
            var firstName = name; // Başarı/Başarısızlık Mesajı İçin
           // Başarılı/Başarısız mesajı için adında boşluk olup olmadığını kontrol eder.
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                dataType: 'json',
                data: {
                    name: name,
                    lastname: lastname,
                    email: email,
                    phone: phone,
                    subject: subject,
                    message: message
                },
                cache: false,
                success: function(data) {
                	if(data.error){
	                    // Fail message
	                    $('#success').html("<div class='alert alert-danger'>");
	                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
	                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
	                    $('#success > .alert-danger').append('</div>');
	                    //tüm alanları temizler
	                    $('#contactForm').trigger("reset");
                	}
                	else if(data.success){
	                    // Başarı mesajı
	                    $('#success').html("<div class='alert alert-success'>");
	                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
	                    $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
	                    $('#success > .alert-success').append('</div>');
	                   //tüm alanları temizler
	                    $('#contactForm').trigger("reset");
					}
                }
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });
});


//*Tam gizle başarısız/başarı kutularına tıklandığında */
$('#name').focus(function() {
    $('#success').html('');
});

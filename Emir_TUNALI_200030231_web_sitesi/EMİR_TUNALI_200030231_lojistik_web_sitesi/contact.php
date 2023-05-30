<?php include 'head.php' ?>
	<body data-scrolling-animations="true">
        <div class="sp-body">
			
<?php include 'header.php' ?>	
			<div class="bg-image page-title">
				<div class="container-fluid">
					<a href="#"><h1>İLETİŞİM VE ADRES BİLGİLERİMİZ</h1></a>
					<div class="pull-right">
						<a href=""><i class="fa fa-home fa-lg"></i></a> &nbsp;&nbsp;|&nbsp;&nbsp; <a href="contact.php">Bağlantılarımız</a>
					</div>
				</div>
			</div>

			<iframe class="we-onmap wow fadeInUp" data-wow-delay="0.3s" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.807473228056!2d36.78432136429551!3d-1.2897720990592767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10a6630bb1c5%3A0x50ddf1cf28b5fa40!2sSifa+Towers%2C+Ring+Rd+Kilimani%2C+Nairobi%2C+Kenya!5e0!3m2!1sen!2s!4v1497946740933"></iframe>

			<div class="container-fluid block-content">
				<div class="row main-grid">
					<div class="col-sm-4">
						<h4>Merkez Ofisimiz</h4>
						<p>Müşterilerimizi mutlu etmek için çok çalışıyoruz.</p>
						<div class="adress-details wow fadeInLeft" data-wow-delay="0.3s">
							<div>
								<span><i class="fa fa-location-arrow"></i></span>
								<div><strong>EMT LOJİSTİK</strong><br>Şerifali, Kale Sokağı No:25, 34775 Dudullu Osb/Ümraniye/İstanbul </div>
							</div>
							<div>
								<span><i class="fa fa-phone"></i></span>
								<div>+90 5399350315 </div>
							</div>
							<div>
								<span><i class="fa fa-envelope"></i></span>
								<div>tunaliemir00@gmail.com</div>
							</div>
							<div>
								<span><i class="fa fa-clock-o"></i></span>
								<div>PZT - CMT  8.00 - 17.00</div>
							</div>
						</div>
						<br><br><hr><br>
						<h4>Havayolu Lojistik Ofisi</h4>
						<div class="adress-details wow fadeInLeft" data-wow-delay="0.3s">
							<div>
								<span><i class="fa fa-location-arrow"></i></span>
								<div><strong>EMT Lojistik</strong><br>İstanbul (Sabiha Gökçen Havalimanı) </div>
							</div>
							<div>
								<span><i class="fa fa-phone"></i></span>
								<div>0850 480 0787 </div>
							</div>
							<div>
								<span><i class="fa fa-envelope"></i></span>
								<div>tunaliemir00@gmail.com</div>
							</div>
							<div>
								<span><i class="fa fa-clock-o"></i></span>
								<div>PZT - CMT  8.00 - 17.00</div>
							</div>
						</div>
					</div>
					<div class="col-sm-8 wow fadeInRight" data-wow-delay="0.3s">
						<h4>Bize mesaj gönderin</h4>
                        
				<?php
                    if(isset($_GET['response1'])){	
                    @$response1 = $_GET['response1'];
                ?>
                <div class="col-md-12" >
			         <div class="alert alert-success display" id="msg">
                    <span class="glyphicon glyphicon-ok"></span> <?php echo "".$response1.""; ?>
                    </div>
				</div>
				<?php } ?>
						<p>Tüm sorularınızı yanıtlamak için buradayız. Bize ulaşın ve mümkün olan en kısa sürede size yanıt vereceğiz.</p>
						<div id="success"></div>
						<form  method="post"  action="send-email.php" class=" form-inline">
							<div class="row form-elem">	
								<div class="col-sm-6 form-elem">
									<div class="form-group default-inp form-elem">
										<i class="fa fa-user"></i>
										<input type="text" name="first_name" id="user-name" placeholder="First Name" required="required">
									</div>
									<div class="form-group default-inp form-elem">
										<i class="fa fa-envelope"></i>
										<input type="text" name="email" id="user-email" placeholder="Email Address" required="required">
									</div>
								</div>
								<div class="col-sm-6 form-elem">
									<div class="form-group default-inp form-elem">
										<i class="fa fa-user"></i>
										<input type="text" name="last_name" id="user-lastname" placeholder="Last Name">
                                        
									</div>
									<div class="form-group default-inp form-elem">
										<i class="fa fa-phone"></i>
										<input type="text" name="telephone" id="user-phone" placeholder="Phone No.">
									</div>
								</div>
							</div>
							<div class="form-group default-inp form-elem">
								<input type="text" name="subject" id="user-subject" placeholder="Subject">
							</div>
							<div class="form-group form-elem default-inp">
								<textarea id="comments" name="comments" placeholder="Message"></textarea>
							</div>
							<div class="form-action form-elem">
                                <button type="submit" name="submit" class="btn btn-success"> mesaj gönder</button>
                            </div>
						</form>
					</div>
				</div>
			</div>

			<?php include 'footer.php' ?>
		</div>

		<!--Main-->   
		<script src="js/jquery-1.11.3.min.js"></script>
		<script src="js/jquery-ui.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/modernizr.custom.js"></script>
		<!--Switcher-->
		<script src="assets/switcher/js/switcher.js"></script>
		<!--Owl Carousel-->
		<script src="assets/owl-carousel/owl.carousel.min.js"></script>
		<!--
		<script src="assets/contact/jqBootstrapValidation.js"></script> 
		<script src="assets/contact/contact_me.js"></script>
		<!-- SCRIPTS -->
	    <script type="text/javascript" src="assets/isotope/jquery.isotope.min.js"></script>
		<!--Theme-->
		<script src="js/jquery.smooth-scroll.js"></script>
		<script src="js/wow.min.js"></script>
		<script src="js/jquery.placeholder.min.js"></script>
		<script src="js/smoothscroll.min.js"></script>
		<script src="js/theme.js"></script>
	</body>

</html>
/**
 * 
 * 
 *
 * 
 *
 * 
 * Bu kod, bir web sayfası için yükleme animasyonu oluşturmaktan sorumludur.
 *  Kaydırmayı devre dışı bırakır ve sayfaya bir yükleme animasyonu ekler. 
 * Yükleme animasyonu tamamlandıktan sonra, yükleme animasyonunu kaldırır ve sayfaya yüklenmiş bir sınıf ekler. 
 * Ayrıca gövdeye bir layout-switch sınıfı ekler ve kaydırmayı yeniden etkinleştirir. 
 * Animasyon, CSS animasyonları kullanılarak oluşturulur ve JavaScript kodu, 
 * animasyonları tetiklemekten ve animasyon olaylarını işlemekten sorumludur.
 * 
 *
 */
(function() {

	var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'ip-container' ),
		header = container.querySelector( '.ip-header' ),
		loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		// animasyon bitiş olay adı
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

	function init() {
		$("html,body").animate({scrollTop: 0}, 0);
		var onEndInitialAnimation = function() {
			if( support.animations ) {
				this.removeEventListener( animEndEventName, onEndInitialAnimation );
			}

			startLoading();
		};

		// kaydırmayı devre dışı bırak
		window.addEventListener( 'scroll', noscroll );

	// başlangıç animasyonu
		classie.add( container, 'loading' );

		if( support.animations ) {
			container.addEventListener( animEndEventName, onEndInitialAnimation );
		}
		else {
			onEndInitialAnimation();
		}
	}

	function startLoading() {
		// bir şey yüklemeyi simüle etme
		var simulationFn = function(instance) {
			var progress = 0,
				interval = setInterval( function() {
					progress = Math.min( progress + Math.random() * 0.1, 1 );

					instance.setProgress( progress );

					// sona ulaşiıldı
					if( progress === 1 ) {
						classie.remove( container, 'loading' );
						classie.add( container, 'loaded' );
						clearInterval( interval );

						var onEndHeaderAnimation = function(ev) {
							if( support.animations ) {
								if( ev.target !== header ) return;
								this.removeEventListener( animEndEventName, onEndHeaderAnimation );
							}

							classie.add( document.body, 'layout-switch' );
							window.removeEventListener( 'scroll', noscroll );
						};

						if( support.animations ) {
							header.addEventListener( animEndEventName, onEndHeaderAnimation );
						}
						else {
							onEndHeaderAnimation();
						}
					}
				}, 80 );
		};

		loader.setProgressFn( simulationFn );
	}
	
	function noscroll() {
		window.scrollTo( 0, 0 );
	}

	init();

})();
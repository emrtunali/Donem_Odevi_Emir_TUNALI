/**
 *
 * Bu kod, adlı bir JavaScript sınıfını tanımlar.
Yol Yükleyici
  bir SVG yolunun çizimini canlandırmak için kullanılır.
   Yapıcı, bir SVG yolu öğesini bağımsız değişken olarak alır ve kontur çizgi dizisini ve ofsetini yolun toplam uzunluğuna ayarlar.
 * 
 */
;( function( window ) {
	
	'use strict';

	function PathLoader( el ) {
		this.el = el;
		// konturu temizleme
		this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();
	}

	PathLoader.prototype._draw = function( val ) {
		this.el.style.strokeDashoffset = this.el.getTotalLength() * ( 1 - val );
	}

	PathLoader.prototype.setProgress = function( val, callback ) {
		this._draw(val);
		if( callback && typeof callback === 'function' ) {
			// verilen süre kadar son ilerleme artışı animasyonu hala görünecektir
			setTimeout( callback, 200 );
		}
	}

	PathLoader.prototype.setProgressFn = function( fn ) {
		if( typeof fn === 'function' ) { fn( this ); }
	}

	// global ad alanına ekle
	window.PathLoader = PathLoader;

})( window );
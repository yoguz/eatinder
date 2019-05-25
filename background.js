// Yemek begenim htmli cikartacak.
function kararButonuEvent() {
	// FIXME: Simlilik alert basiyor.
	alert("Tinderla beni");
}

// Sayfanin gercekten restoran listeleme sayfasi mi oldugunu kontrol eder.
function restoranListelemeEkraniMi() {
	// FIXME: Simdilik true donuyor.
	return true;
}

// Sayfa yuklendikten sonra cagirilir.
function onWindowLoad() {
	// Restoran listeleme ekrani degilse pas gecilir.
	if (!restoranListelemeEkraniMi()) {
		return;
	}
	
	var kararButonu = document.createElement("button");
	kararButonu.innerHTML = "Karar Veremiyorum";
	kararButonu.className = "ys-btn ys-btn-info ys-btn-xs";
	kararButonu.id = "kararButonu";
	kararButonu.addEventListener("click", kararButonuEvent);
	kararButonu.style = "padding-top:4px; padding-bottom:4px;";
	
	var butonListesi = document.body.getElementsByClassName("ys-reslist-sort init")[0];
	butonListesi.append(kararButonu); 	// Karar Veremiyorum butonu sayfaya eklenir.
}

window.onload = onWindowLoad;

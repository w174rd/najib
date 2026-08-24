/*
	najib • info — ambient glitch

	Deals the hover burst to a random ward now and then. This lives in JS
	rather than CSS on purpose: CSS can stagger but it cannot shuffle. Fixed
	durations and delays always settle into an order, and a row of seven
	taking turns reads as a roll call, not as interference.

	The class only carries the trigger — the keyframes it lands on are the
	same ones :hover uses, so an unattended ward tears identically.
*/
(function () {

	if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	// one pool: the seven nav wards plus the share and QR tools, so a burst
	// can land anywhere on the page rather than only inside the row
	var wards = document.querySelectorAll(
		'#header nav a, .share-button-container .view-modal, .share-button-container .view-modal-qrcode'
	);
	if (!wards.length) return;

	var BURST = 420;    // must outlast the 0.4s keyframes
	var MIN_GAP = 600;
	var MAX_GAP = 3400;

	var last = -1;

	function pick() {
		var i;
		// never the same ward twice running — a repeat reads as a stuck loop
		do {
			i = Math.floor(Math.random() * wards.length);
		} while (wards.length > 1 && i === last);
		last = i;
		return wards[i];
	}

	function burst() {
		var ward = pick();
		ward.classList.add('is-glitching');
		setTimeout(function () {
			ward.classList.remove('is-glitching');
		}, BURST);
	}

	// the pointer wins: hold the ambient pass while anything is under it.
	// Asked per target rather than of a container, because the two tools sit
	// outside the nav and a container test would miss them.
	function inUse() {
		for (var i = 0; i < wards.length; i++) {
			if (wards[i].matches(':hover')) return true;
		}
		return false;
	}

	function schedule() {
		setTimeout(function () {
			if (!document.hidden && !inUse()) burst();
			schedule();
		}, MIN_GAP + Math.random() * (MAX_GAP - MIN_GAP));
	}

	schedule();

})();

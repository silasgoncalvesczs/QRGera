# QRCode.js
QRCode.js é uma biblioteca javascript para fazer QRCode. QRCode.js suporta cross-browser com HTML5 Canvas e tag de tabela em DOM.
QRCode.js não tem dependências

## Basic Usages
```
<div id="qrcode"></div>
<script type="text/javascript">
new QRCode(document.getElementById("qrcode"), "https://github.com/silasgoncalvesczs/QRGera");
</script>
```

ou com algumas opções

```
<div id="qrcode"></div>
<script type="text/javascript">
var qrcode = new QRCode(document.getElementById("qrcode"), {
	text: "https://github.com/silasgoncalvesczs/QRGera",
	width: 128,
	height: 128,
	colorDark : "#000000",
	colorLight : "#ffffff",
	correctLevel : QRCode.CorrectLevel.H
});
</script>
```

e você pode usar alguns métodos

```
qrcode.clear(); // clear the code.
qrcode.makeCode("http://naver.com"); // make another code.
```

## Browser Compatibility
IE6~10, Chrome, Firefox, Safari, Opera, Mobile Safari, Android, Windows Mobile, ETC.

## License
MIT License

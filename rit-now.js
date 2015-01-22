io().on('update-connected-clients', function(n){
	/* If you are old school :) */
	document.getElementById('connected-clients').innerHTML = n
	
	/* Or if you are using jQuery 
		$("span#connected-clients").html(n);
	*/
});


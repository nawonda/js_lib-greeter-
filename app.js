$('#login').click(function(){
    var loginGrtr = G$('Jerry','Zhang');
    
    $('#logindiv').hide();
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting',true).log();
});


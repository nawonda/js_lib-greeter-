;(function (global, $) {
    
    // 'new' an obj
    var Greeter = function (firstName, lastName, language) {
        return new Greeter.init(firstName, lastName, language);        
    }
    
    // hidden within the scope of the IIFE and never directly accessible
    var supportedLanguages = ['en','es','jp','ch'];
    
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        jp: 'こんにちは',
        ch: '你好'
    };
    
    var formalGreetings = {
        en: 'Greeting',
        es: 'Saludos',
        jp: '挨拶',
        ch: '您好'
    };
    
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion',
        jp: 'ログイン',
        ch: '登入'
    };
    
    // prototype holds methods (to save memory space)
    Greeter.prototype = {
        
        // 'this' refers to the calling object at execution time
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function() {   
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        
        greeting: function() {
            
            return greetings[this.language] + ' ' + this.firstName + '!';
            
        },
        
        formalGreeting: function() {
            
            return formalGreetings[this.language] + ' ' + this.fullName() + '!';
            
        },
        
        greet: function(formal) {
            
            var msg;
            
            if(formal){
                msg = this.formalGreeting();
            }else{
                msg = this.greeting();
            }
            if(console){
                console.log(msg);
            }
            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        log: function(){
            if(console){
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            return this;
        },
        
        setLang: function(lang) {
            this.language = lang;
            
            this.validate();
            
            // make chainable
            return this;                
        },
        
        HTMLGreeting: function(selector,formal){
            if(!$){
                throw 'jQuery not loaded';                
            }
            
            var msg;
            if(formal){
                msg = this.formalGreeting();
            }else{
                msg = this.greeting();
            }
            
            $(selector).html(msg);
            
            // make chainable
            return this;        
        }
        
    };    
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greeter.init = function(firstName, lastName, language) {
        
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        
        self.validate();
                
    }
    //set init's methods in prototype chain
    Greeter.init.prototype = Greeter.prototype;
    
    global.Greeter = global.G$ = Greeter;
    
}(window, jQuery));
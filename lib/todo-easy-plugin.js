'use strict';

(function ($) {
  $.fn.MyTodo = function (options) {
    this.settings = $.extend({
      'el': $(this) || []
    }, options);

    var el = this.settings.el;
    var div;
    var priv = {};
    var a = jQuery('<div></div>');
    var focus = 0;
    var h1;
    var p;
    var inputNiveau = jQuery('<input placeholder="Niveau" type="text">');
    var result = [];
    //list of Pokemons
    var pokemons = [{
      'id': 1, 
      'name': 'bulbizarre',
      'type': 'plante',
      'poid': '6,9 kg',
      'att': '49',
      'vit': '45',
      'pv': '45',
      'def': '49',
      'img': 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png'
    },{
      'id': 1, 
      'name': 'bulble',
      'type': 'plante',
      'poid': '6,9 kg',
      'att': '49',
      'vit': '45',
      'pv': '45',
      'def': '49',
      'img': 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png'
    },{
      'id': 4, 
      'name': 'salade',
      'type': 'plante',
      'poid': '6,9 kg',
      'att': '49',
      'vit': '45',
      'pv': '45',
      'def': '49',
      'img': 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png'
    },{
      'id': 2, 
      'name': 'salamèche',
      'type': 'feu',
      'poid': '8,5 kg',
      'att': '49',
      'vit': '45',
      'pv': '45',
      'def': '49',
      'img': 'https://www.pokepedia.fr/images/8/89/Salam%C3%A8che-RFVF.png'
    },{
      'id': 3, 
      'name': 'carapuce',
      'type': 'eau',
      'poid': '9,0 kg',
      'att': '49',
      'vit': '45',
      'pv': '45',
      'def': '49',
      'img': 'https://www.pokepedia.fr/images/c/cc/Carapuce-RFVF.png'
    },]

    // Public Methods - External methods
    Object.assign(this, {

      /**
       * generate input, h1, button
       */
      'generator': function() {
        var form = jQuery('<form class="form-control" action="#"></form>');
        var div = jQuery('<div class="autocomplete" style="width:300px"></div>')
        var input = jQuery('<input class="inputPokemons" type="text" placeholder="Pokemons">');
        var btn = jQuery('<input type="submit">');

        $(a).attr('class', 'autocomplete-items');

        $(el).append(form);
        $(form).append(div);
        $(div).append(input);
        $(div).append(btn);
        $(div).append(a);

        this.keypress();
      },

      /**
       * find a pokemon from the list
       */
      'findPokemon' : function(research) {
        result = [];
        $.each(pokemons, function(index, value) { //try with .find or .filter
          for(var i = 0; i <= research.length; i++) {
            if (research.toLowerCase() === value.name.substring(0, research.length)) {
              result.push(value);
              break;
            }
          }
          this.listPokemon(result);
        }.bind(this));        
      },

      /**
       * list pokemon in the auto-completion
       */ 
      'listPokemon': function(value) {
        if($(div)) {
          $(a).empty();
        }
        $.each(value, function(index,value) {
          div = jQuery('<div>'+ value.name +'</div>');

          $(div).attr('class', 'item');

          $(div).css({
          'padding' : '10px',
          'cursor' : 'pointer',
          'background-color' : '#fff',
          'border' : '1px solid #d4d4d4'
          });

          $(a).append(div);
        })
        this.clickItem();
      }.bind(this),

      /**
       * show the pokemon after submiting
       */
      'printPokemon': function(value) {
        if ($('.divPokemons')) {
          $('.divPokemons').remove();
        }
        var divPokemons = jQuery('<div class="divPokemons"></div>');
        h1 = jQuery("<h1 class='h1'>"+ value.name.toUpperCase() +"</h1>");
        p = jQuery("<p class='h1'>"+ value.type + " | "+ value.poid+"<br>"+ "Attaque : "+ value.att + " | "+ "Vitesse : " + value.vit + " | " + " Point de Vie : " + value.pv + " | " + "Defense : "  + value.def + "</p>");
        var img = jQuery("<img class='h1' src='"+ value.img +"'>");

        $(inputNiveau).css({
          'background-color': '#f1f1f1',
          'font-family': '100%',
          'font-size': '20px',
          'width': '150px',
          'height': '30px'
        })

        $(el).append(divPokemons);
        $(divPokemons).append(h1);
        $(divPokemons).append(inputNiveau);
        $(divPokemons).append(p);
        $(divPokemons).append(img);
        this.countLevel();
      },

      /**
       * count level from the input
       */
      'countLevel': function() {
        $(inputNiveau).keypress(function(e) {
          if(e.keyCode === 13) {
            this.changeStat($(inputNiveau).val());
          }
        }.bind(this))
      },

      /**
       * alert the new stats of the pokemon
       * (depends on his lvl)
       */
      'changeStat': function(lvl) {
        if (lvl && $.isNumeric(lvl) && lvl <= 100) {
          $.each(pokemons, function(index, value) {
            if($('h1').html().toLowerCase() === value.name) {
              alert("Niveau : "+ lvl + " | " +"Attaque : "+ value.att*lvl + " | "+ "Vitesse : " + value.vit*lvl + " | " + " Point de Vie : " + value.pv*lvl + " | " + "Defense : "  + value.def*lvl);
            }
          }.bind(this))
        }
        else {
          alert('please fill the input with a number below 100');
        }
      },

      /**
       * find pokemon to print it
       */
      'findPokemonSubmit': function(research){
        $.each(pokemons, function(index,value) {
          if(research === value.name) {
            this.printPokemon(value);
            if ($(div)) {
              $(a).empty();
            }
          }
        }.bind(this));
      },

      /**
       * event every time key is pressed
       */
      'keypress' : function() {
        $('input').keypress(function() {
          if ($('input').val().length > 0) {
            this.findPokemon($('input').val());
          }
        }.bind(this));
      },

      /**
       * click on item of the list
       */
       'clickItem': function() {
         var value;
         $('.item').click(function() {
           $('.inputPokemons').val($(this).html());
         })
       },

       /**
        * press the enter key
        */
      'submit': function() {
        $('input').keypress(function(e) {
          if (e.keyCode == 13) {
            e.preventDefault();
            this.findPokemonSubmit($('input').val());
          }
        }.bind(this))
      },

      /**
        * click the submit button
        */
      'clickSubmit': function() {
        $('input[type=submit]').click(function() {
          this.findPokemonSubmit($('input').val());
        }.bind(this))
      },

      /**
       * delete autocompletion 
       */
      'delete': function() {
        $('input').keyup(function(e){
          if(e.keyCode === 8) {
            if($(div)) {
              $(a).empty();
            }
          }
        });
        $(window).click(function() {
          if($(div)) {
            $(a).empty();
          }
        });
      },

      /**
       * personal styling settings 
       */ 
      'style': function() {
        $.each(this.settings, function(index, value){
          $.each(value, function(index, value) {
            // console.log(value);
          })
        });
      },
    });

    // Private Methods - Internal methods
    Object.assign(priv, {
      'style': function() {
        $('input').css({
          'border' : '1px solid transparent',
          'background-color' : '#f1f1f1',
          'padding' : '10px',
          'font-size': '16px'
        })
        $('.autocomplete-items').css({
          'position' : 'absolute',
          'border' : '1px solid transparent',
          'border-bottom' : 'none',
          'border-top' : 'none',
          'width': '190px',
          'z-index': '99',
          'top': '100%',
          'left': '0',
          'rigth': '0'
        })
        $('.autocomplete-items-div').css({
          'padding' : '10px',
          'cursor' : 'pointer',
          'background-color' : '#fff',
          'border-bottom' : '1px solid #d4d4d4'
        })
        $('input[type=text]').css({
          'background-color': '#f1f1f1',
          'font-family': '100%'
        })
        $('input[type=submit]').css({
          'background-color': 'DodgerBlue',
          'color': '#fff',
          'cursor': 'pointer',
          'margin-left': '5px'
        })
        $('.autocomplete').css({
          'position': 'relative',
          'display': 'inline-block'
        })
      },
      /**
       * Initialize the plugin
       */
      'init': function () {

        el.attr('placeholder', this.settings.placeholder);

        this.generator();
        this.style();
        this.delete();
        this.submit();
        this.clickSubmit();
        
        priv.style();

        return this;
      }.bind(this)
    });

    // Initialise the plugin
    priv.init();

    return this;
  };
}(jQuery));
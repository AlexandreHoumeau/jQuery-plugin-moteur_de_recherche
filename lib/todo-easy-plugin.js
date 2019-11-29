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
    var result = [];

    var pokemons = [{
      'id': 1, 
      'name': 'bulbizarre',
      'type': 'plante',
      'poid': '6,9 kg',
      'img': 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png'
    },{
      'id': 1, 
      'name': 'bulble',
      'type': 'plante',
      'poid': '6,9 kg',
      'img': 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png'
    },{
      'id': 4, 
      'name': 'salade',
      'type': 'plante',
      'poid': '6,9 kg',
      'img': 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png'
    },{
      'id': 2, 
      'name': 'salamèche',
      'type': 'feu',
      'poid': '8,5 kg',
      'img': 'https://www.pokepedia.fr/images/8/89/Salam%C3%A8che-RFVF.png'
    },{
      'id': 3, 
      'name': 'carapuce',
      'type': 'eau',
      'poid': '9,0 kg',
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
        
      }.bind(this),

      /**
       * show the pokemon after submiting
       */
      'printPokemon': function(value) {
        var h1 = jQuery("<h1 class='h1'>"+ value.name +"</h1>");
        var p = jQuery("<p class='h1'>"+ value.type + " "+ value.poid+"</p>");
        var img = jQuery("<img class='h1' src='"+ value.img +"'>");

        $(el).append(h1);
        $(el).append(p);
        $(el).append(img);
      },

      /**
       * find pokemon to print it
       */
      'findPokemonSubmit': function(){
        $.each(pokemons, function(index,value) {
          if($('input').val() === value.name) {
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
          if ($('input').val().length > 1) {
            this.findPokemon($('input').val());
          }
        }.bind(this));
      },

      'submit': function() {
        $('input').keypress(function(e) {
          if (e.keyCode == 13) {
            e.preventDefault();
            this.findPokemonSubmit();
          }
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

      /**
       * Get the value after keypress "enter"
       * @param {function} callback
       */
      'getValue': function (callback) {
        el.on('keyup', function (e) {
          if (e.keyCode == 13) {
            callback(e, el.val());

            el.val('');
          }
        });
        return this;
      },

      /**
       * Generate li element with a value
       * @param {String} value
       */
      'setTask': function (value) {
        if (! value.length) {
          return this;
        }

        var id = Math.floor(Math.random() * 26) + Date.now();

        $('body').append('<li id="'+ id +'"><span>' + value + '</span></li>');
        $('#' + id).append(' <button class="btn-remove">remove</button>');
        $('#' + id).append(' <button class="btn-done">done</button>');
        $('#' + id).append(' <button class="btn-edit">edit</button>');

        return this;
      },
      /**
       * done task
       */
      'doneTask': function () {
        $('li > .btn-done').on('click', function () {
          $(this).parent().children('span').css({
            'color': 'green',
            'font-weight': 'bold',
            'text-decoration': 'line-through'
          });
        });
      },
      /**
       * remove task
       */
      'removeTask': function () {
        $('li > .btn-remove').on('click', function () {
          $(this).parent().remove();
        });
      },
      /**
       * edit task
       */
      'editTask': function() {
        $('li > .btn-edit').on('click', function () {
          $(this).parent().children('.btn-edit').hide();
          var valueTask = $(this).parent().children('span').text();
          var button = $('<button/>', {
            text: 'update',
            click: function () {
              var value = $(this).parent().children('input').val();

              $(this).parent().children('span').text(value);
              $(this).parent().children('input').remove();
              $(this).parent().children('.btn-edit').show();
              $(this).remove();
            }
          });

          $(this).parent().append('<input class="edit-input" value="'+valueTask+'"></input>');
          $(this).parent().append(button);
        });
      }
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
        priv.style();

        return this;
      }.bind(this)
    });

    // Initialise the plugin
    priv.init();

    return this;
  };
}(jQuery));
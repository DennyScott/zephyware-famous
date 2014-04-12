/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Scrollview = require('famous/views/Scrollview');
    var View = require('famous/core/View');
    var Modifier = require('famous/core/Modifier');
    var OptionsManager = require('famous/core/OptionsManager');
    var RenderNode = require('famous/core/RenderNode');
    var Utility = require('famous/utilities/Utility');
    var RenderController = require('famous/views/RenderController');
    var NavigationBar = require('famous/widgets/NavigationBar');
    
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    var EdgeSwapper = require('famous/views/EdgeSwapper');

     // create the layout
     var layout = new HeaderFooterLayout({
        headerSize:100,
        footerSize:50
    });

        // create the header
        var headerController = new RenderController({

            inTransition: {curve: 'easeIn', duration: 500},
            outTransition: {curve: 'easeIn', duration: 225},
            overlap: false
        });
        layout.header.add(headerController);

        var headerSurface = new Surface({
            size:[undefined,100],
            content:'Zephyware',
            classes:["header-bg"]
        });

        // create the footer
        layout.footer.add(new Surface({
            size:[undefined, 50],
            content:'footer',
            classes: ['footer-bg']
        }));
        

        // create the content area
        var contentArea = new EdgeSwapper({
            inTransition: {curve: 'easeOutBounce', duration: 1000},
            outTransition: {duration: 300},
            overlap: true
        });



    // create the main context
    var mainContext = Engine.createContext();

    mainContext.add(layout);

    layout.content.add(contentArea);

    // your app here
    var image = new Surface({
        size: [200, 200],
        content: '<img width="400" src="' + 'content/images/logo.png' + '"/>',
        properties: {
            lineHeight: '200px',
            textAlign: 'center'
        }
    });

        // your app here
        var outline = new Surface({
            size: [200, 200],
            content: 'Hello',
            properties: {
                lineHeight: '200px',
                textAlign: 'center'
            }
        });

        var s1 = new View();
        var s2 = new View();
        s1.add(outlineModifier).add(image);
        s2.add(outlineModifier).add(outline);

        var outlineModifier = new Modifier({
            origin: [0.5, 0.5]
        });

        var scrollview = new Scrollview({
            direction: 0,
            paginated:true
        });

        var relativeNode = contentArea.show(scrollview);
        headerController.show(headerSurface);
        scrollview.sequenceFrom([s1,s2]);
    });
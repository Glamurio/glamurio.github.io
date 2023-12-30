$( document ).ready(function() {

    /* Context Menu */
    $('#main-container').on('contextmenu', function(event) {
        console.log('check')
        event.preventDefault();
        $('#context-menu').removeClass('hide')
        $('#context-menu')[0].style.top = mouseY(event) + 'px';
        $('#context-menu')[0].style.left = mouseX(event) + 'px';

        window.event.returnValue = false;
    });

    function mouseX(evt) {
        if (evt.pageX) {
            return evt.pageX;
        } else if (evt.clientX) {
            return evt.clientX + (document.documentElement.scrollLeft ?
            document.documentElement.scrollLeft :
            document.body.scrollLeft);
        } else {
            return null;
        }
    }
      
    function mouseY(evt) {
        if (evt.pageY) {
            return evt.pageY;
        } else if (evt.clientY) {
            return evt.clientY + (document.documentElement.scrollTop ?
            document.documentElement.scrollTop :
            document.body.scrollTop);
        } else {
            return null;
        }
    }

    // Window Function
    let lastWindowPos
    let windowTemplate = `
    <div class="window-tab">
        <span class="window-title"></span>
        <button class="close-btn">X</button>
    </div>
    <div class="window-content-wrapper">
        <textarea class="window-content">
        </textarea>
    </div>
    `

    $('.icon-wrapper').on('dblclick', function(event) {
        let windowContainer = document.createElement("div");
        windowContainer.classList = 'window-container'
        windowContainer.innerHTML = windowTemplate
    
        $('#main-container').append(windowContainer)
        resetFocus(windowContainer)
        if (lastWindowPos) {
            $(windowContainer).css({
                'top': lastWindowPos.top + 10 + 'px',
                'left': lastWindowPos.left + 10  + 'px'
            })
        }
        lastWindowPos = $(windowContainer).offset();
        const id = $(this).find('img').attr('id')
        const icon = $(this).find('img').attr('src')
        switch(id) {
            case 'about-me':
                tabHtml = `<img class="icon" src="${icon}" alt="About Me"> About Me`
                $(windowContainer).find('.window-title').html(tabHtml)
                windowContent = "It's me!"
                break;
            default:
                break;
        }
        $('.window-content').html(windowContent)
        initWindows()
    })

    // Init Windows
    initWindows = () => {
        const dragOptions = {
            handle: '.window-tab',
            containment: '#main-container',
            drag: function() {
                resetFocus(this)
                lastWindowPos = $(this).offset();
              },
        }
        $('.window-container').draggable(dragOptions);
        const resizeOptions = {
            minHeight: 150,
            minWidth: 200,
            containment: '#main-container',
            alsoResize: $(this).find(".window-content-wrapper, .window-content"),
        }
        $('.window-container').resizable(resizeOptions);
        $('.window-container').on('click', function() {
            resetFocus(this)
            lastWindowPos = $(this).offset();
        })
        $('.close-btn').on('click', function() {
            $(this).parent().parent().remove()
        })
    }

    resetFocus = (selector) => {
        $('.focus').removeClass('focus')
        $(selector).addClass('focus')
    }

    // Init Icons
    initIcons = () => {
        const dragOptions = {
            containment: '#main-container',
            grid: [ 100, 100 ]
        }
        $( '.icon-wrapper' ).draggable(dragOptions)
        $( '.icon-wrapper' ).on('click', function(event) {
            event.stopPropagation();
            $(this).find('.icon-container').addClass('selected')
        })
    }
    initIcons()

    $(document).on('click', function() {
        $('.selected').removeClass('selected');
        $('#context-menu').addClass('hide');
    });
});

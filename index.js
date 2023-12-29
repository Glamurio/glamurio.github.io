$( document ).ready(function() {
    // Window Function
    $( function() {
        let windowTemplate = `
        <div class="window-tab">
            <span class="window-title"></span>
            <button class="close-btn">X</button>
        </div>
        <div class="window-content">
        </div>
        `

        $('.icon-wrapper').on('click', function() {
            let windowContainer = document.createElement("div");
            windowContainer.classList = 'window-container'
            windowContainer.innerHTML = windowTemplate
            $('#main-container').append(windowContainer)
            const id = $(this).find('img').attr('id')
            switch(id) {
                case 'about-me':
                    $(windowContainer).find('.window-title').html('About Me')
                    windowContent = "It's me!"
                    break;
                default:
                    break;
            }
            $('.window-content').html(windowContent)
            $initWindows()
        })
    }) 

    // Init Windows
    $initWindows = () => {
        const dragOptions = {
            handle: '.window-tab',
            containment: '#main-container'
        }
        $('.window-container').draggable(dragOptions);
        const resizeOptions = {
            minHeight: 150,
            minWidth: 200,
            containment: '#main-container'
        }
        $('.window-container').resizable(resizeOptions);
        $('.window-container').on('click', function() {
            $('.focus').removeClass('focus')
            $(this).addClass('focus')
        })
        $('.close-btn').on('click', function() {
            $(this).parent().parent().remove()
        })
    }

    // Init Icons
    $initIcons = () => {
        $( '.icon-wrapper' ).on('click', function(event) {
            event.stopPropagation();
            $(this).find('.icon-container').addClass('selected')
        })
        $(document).on('click', function() {
            $('.selected').removeClass('selected');
        });
    }
    $initIcons()
});

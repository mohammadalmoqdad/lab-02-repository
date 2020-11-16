Image.all = [];
function Image(imgObject) {
    this.image_url = imgObject.image_url;
    this.title = imgObject.title;
    this.description = imgObject.description;
    this.keyword = imgObject.keyword;
    this.horns = imgObject.horns;
    Image.all.push(this);
}



var options = '';
var count = 0;
var keywords = [];
$.ajax('./page-1.json')
    .then(data => {
        data.forEach(element => {
            let imgObject = new Image(element);
            if (!keywords.includes(element.keyword)) {
                keywords.push(element.keyword);
            }

        });

        // to render the drop-down list
        for (var i = 0; i < keywords.length; i++) {
            options = $('.option').clone();
            $('.options-section').append(options);
            options.text(keywords[i]);//image.all[i].keyword

            options.removeClass('option');
            options.attr('value',keywords[i]);// to give each option the value of keword  
        }

        // render Images
        Image.all.forEach(element => {
            console.log(232)
            let imgSection = $('.photo-template').clone();
            $('.main').append(imgSection);
           
            //add the values to elements inside created sections
            imgSection.removeClass('photo-template');
            imgSection.find('.imageTitle').text(element.title);
            imgSection.find('.imageDescription').text(element.description);
            imgSection.find('.image').attr('src', element.image_url);
            imgSection.attr('class','deleteMe');// give the sections classes to remove them before rendering Images again.

            
            
        });
        
        //render images depend on the keyword
        $('.options-section').on('change',renderImgsKewordBased);
        function renderImgsKewordBased(event){
            $('.deleteMe').remove();
            // $('.deleteMe').attr('style','display: none;');
            console.log(event.target.value)
            Image.all.forEach(element => {
                if(element.keyword==event.target.value){
                    
                     let imgSection = $('.photo-template').clone();
                     $('.main').append(imgSection);
                    // console.log(imgSection.text)
                     imgSection.removeClass('photo-template');
                     imgSection.find('.imageTitle').text(element.title);
                     imgSection.find('.imageDescription').text(element.description);
                     imgSection.find('.image').attr('src', element.image_url);
                     imgSection.attr('class','deleteMe');
                    
                }
                else if("default"==event.target.value){
                    let imgSection = $('.photo-template').clone();
            $('.main').append(imgSection);
           
            //add the values to elements inside created sections
            imgSection.removeClass('photo-template');
            imgSection.find('.imageTitle').text(element.title);
            imgSection.find('.imageDescription').text(element.description);
            imgSection.find('.image').attr('src', element.image_url);
            imgSection.attr('class','deleteMe');// give the sections classes to remove them before rendering Images again.

                }

                    
            });
        }
    });


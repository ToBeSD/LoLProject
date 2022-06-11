/**
 * form 하위 요소 return
 * parameter에 따라 disabled 되더라도 form 하위 element를 얻을 수 있다.
 *  
 * @param {Boolean} disableOption disabled 여부.
 *                               true -> disabled도 get. false -> diabled뺴고 get
 * @returns {Object} object
 */
 HTMLFormElement.prototype.toObject = function( disableOption ){

    var _disableOption = ( disableOption !== undefined ) ? disableOption : false; //기본값 false
    var obj = {};
    var elements = this.elements;
    
    for( var j=0; j<elements.length; j++ ){

        var element = elements[j];
        var elName = element.name;
        if(!!!elName){
            continue;
        }

        if( element.nodeName === 'INPUT' && element.type === 'radio' && isValid(element) ){
            obj[elName] = Array.prototype
                .filter.call(this.querySelectorAll('input[name=' + elName + ']'), function(radio){
                    return radio.checked;
                })
                .map(function (radio) {
                    return radio.value;
                }).toString();
        } else if( element.nodeName === 'INPUT' && element.type === 'checkbox' && isValid(element) ){

            obj[elName] = Array.prototype
                .filter.call(this.querySelectorAll('input[name=' + elName + ']'), function(checkbox){
                    return checkbox.checked;
                })
                .map(function (checkbox) {
                    return checkbox.value;
                }).toString();

        } else if( isValid(element) ){
            obj[elName] = element.value;
        }
    }

    return obj;

    // disable opiotion에 따른 조건문 return
    function isValid(element){
        return _disableOption ? (element.name !== undefined) : (element.name !== undefined) && !element.disabled
    }
}
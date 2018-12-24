/*
*
 */
TeamJsSignal = function(){
	this.active = true;
	this.disableList = [];
}
TeamJsSignal.prototype = {
	constructor:TeamJsSignal,
	_registerListener:function(type,_func){
        if(this.listener === undefined) 
            this.listener = {};
        if(this.listener[type] === undefined){
            this.listener[type] = [];
        }

        if(this.listener[type].indexOf(_func) === -1){
            this.listener[type].push(_func);
        }
    },
     _removeListener:function(type,_func){
        if(this.listener === undefined) return;
        var listenerArray = this.listener[type];
        if(listenerArray !== undefined){
            var index = listenerArray.indexOf(_func);
            if(index !== -1){
                listenerArray.splice(index,1);
            }
        }
    },
    addListener:function(_type,listener){
    	if(_type === undefined){
    		throw new Error("TeamJsSignal.add:_type is undefined.")
    		return;
    	}
        if(typeof listener !== "function"){
            throw new Error("TeamJsSignal.add:listener is not function. ")
            return;
        } 
        this._registerListener(type,listener);
    },
    remove:function(_type,listener){
        if(_type === undefined){
    		throw new Error("TeamJsSignal.remove:_type is undefined.")
    		return;
    	}
        if(typeof listener !== "function"){
             throw new Error("listener is not function. ")
             return;
        }
        this._removeListener(type,listener);
    },
    publish:function(_type){
    	if(_type === undefined){
    		throw new Error("TeamJsSignal.publish:_type is undefined.")
    		return;
    	}
    	if(!this.active || this.disableList.indexOf(_type) > -1) return;
    	var param = [];
    	if(arguments.length > 1){
    		for(var i = 1,p; p = arguments[i ++];){
    			param.push(p);
    		}
    	}
    	var listenerArray = this.listener[_type];
    	if(listenerArray !== undefined){
    		listenerArray.forEach(function(listener){
    			listener.apply(this,param);
    		});
    	}
    },
    disable:function(){
    	if(arguments.length < 1) return;
    	for(var i = 0,o; o = arguments[i ++];){
    		this.disableList.push(o);
    	}
    },
    enable:function(){
    	if(arguments.length < 1) return;
    	for(var i = 0; i < arguments.length; i ++){
    		var o  = arguments[i],
    			index = this.disableList.indexOf(o);
    		if(index > -1){
    			this.disableList.splice(index,1);
    		}
    	}
    }
}
if (typeof define === 'function' && define.amd ) {
	define('myaide', TeamJsSignal);
} else if ('undefined' !== typeof exports && 'undefined' !== typeof module) {
	module.exports = TeamJsSignal;
}



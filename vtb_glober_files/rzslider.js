/*! angularjs-slider - v2.4.1 -  (c) Rafal Zajac <rzajac@gmail.com>, Valentin Hervieu <valentin@hervieu.me>, Jussi Saarivirta <jusasi@gmail.com>, Angelin Sirbu <angelin.sirbu@gmail.com> -  https://github.com/angular-slider/angularjs-slider -  2016-01-15 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["angular"],b):"object"==typeof module&&module.exports?module.exports=b(require("angular")):b(a.angular)}(this,function(a){"use strict";var b=a.module("rzModule",[]).factory("RzSliderOptions",function(){var b={floor:0,ceil:null,step:1,precision:0,id:null,translate:null,stepsArray:null,draggableRange:!1,draggableRangeOnly:!1,showSelectionBar:!1,showSelectionBarEnd:!1,hideLimitLabels:!1,readOnly:!1,disabled:!1,interval:350,showTicks:!1,showTicksValues:!1,ticksTooltip:null,ticksValuesTooltip:null,vertical:!1,selectionBarColor:null,keyboardSupport:!0,scale:1,enforceRange:!1,onlyBindHandles:!1,onStart:null,onChange:null,onEnd:null},c={},d={};return d.options=function(b){a.extend(c,b)},d.getOptions=function(d){return a.extend({},b,c,d)},d}).factory("rzThrottle",["$timeout",function(a){return function(b,c,d){var e,f,g,h=Date.now||function(){return(new Date).getTime()},i=null,j=0;d=d||{};var k=function(){j=h(),i=null,g=b.apply(e,f),e=f=null};return function(){var l=h(),m=c-(l-j);return e=this,f=arguments,0>=m?(a.cancel(i),i=null,j=l,g=b.apply(e,f),e=f=null):i||d.trailing===!1||(i=a(k,m)),g}}}]).factory("RzSlider",["$timeout","$document","$window","$compile","RzSliderOptions","rzThrottle",function(b,c,d,e,f,g){var h=function(a,b){this.scope=a,this.sliderElem=b,this.range=void 0!==this.scope.rzSliderModel&&void 0!==this.scope.rzSliderHigh,this.dragging={active:!1,value:0,difference:0,offset:0,lowLimit:0,highLimit:0},this.positionProperty="left",this.dimensionProperty="width",this.handleHalfDim=0,this.maxPos=0,this.precision=0,this.step=1,this.tracking="",this.minValue=0,this.maxValue=0,this.valueRange=0,this.initHasRun=!1,this.internalChange=!1,this.fullBar=null,this.selBar=null,this.minH=null,this.maxH=null,this.flrLab=null,this.ceilLab=null,this.minLab=null,this.maxLab=null,this.cmbLab=null,this.ticks=null,this.init()};return h.prototype={init:function(){var b,c,e=this,f=function(){e.calcViewDimensions()};this.applyOptions(),this.initElemHandles(),this.manageElementsStyle(),this.setDisabledState(),this.calcViewDimensions(),this.setMinAndMax(),this.addAccessibility(),this.updateCeilLab(),this.updateFloorLab(),this.initHandles(),this.manageEventsBindings(),this.scope.$on("reCalcViewDimensions",f),a.element(d).on("resize",f),this.initHasRun=!0,b=g(function(){e.onLowHandleChange()},e.options.interval),c=g(function(){e.onHighHandleChange()},e.options.interval),this.scope.$on("rzSliderForceRender",function(){e.resetLabelsValue(),b(),e.range&&c(),e.resetSlider()}),this.scope.$watch("rzSliderOptions",function(a,b){a!==b&&(e.applyOptions(),e.resetSlider())},!0),this.scope.$watch("rzSliderModel",function(a,c){e.internalChange||a!==c&&b()}),this.scope.$watch("rzSliderHigh",function(a,b){e.internalChange||a!==b&&(null!=a&&c(),(e.range&&null==a||!e.range&&null!=a)&&(e.applyOptions(),e.resetSlider()))}),this.scope.$on("$destroy",function(){e.unbindEvents(),a.element(d).off("resize",f)})},onLowHandleChange:function(){this.setMinAndMax(),this.updateLowHandle(this.valueToOffset(this.scope.rzSliderModel)),this.updateSelectionBar(),this.updateTicksScale(),this.updateAriaAttributes(),this.range&&this.updateCmbLabel()},onHighHandleChange:function(){this.setMinAndMax(),this.updateHighHandle(this.valueToOffset(this.scope.rzSliderHigh)),this.updateSelectionBar(),this.updateTicksScale(),this.updateCmbLabel(),this.updateAriaAttributes()},applyOptions:function(){this.options=f.getOptions(this.scope.rzSliderOptions),this.options.step<=0&&(this.options.step=1),this.range=void 0!==this.scope.rzSliderModel&&void 0!==this.scope.rzSliderHigh,this.options.draggableRange=this.range&&this.options.draggableRange,this.options.draggableRangeOnly=this.range&&this.options.draggableRangeOnly,this.options.draggableRangeOnly&&(this.options.draggableRange=!0),this.options.showTicks=this.options.showTicks||this.options.showTicksValues,this.scope.showTicks=this.options.showTicks,this.options.showSelectionBar=this.options.showSelectionBar||this.options.showSelectionBarEnd,this.options.stepsArray?(this.options.floor=0,this.options.ceil=this.options.stepsArray.length-1,this.options.step=1,this.customTrFn=function(a){return this.options.stepsArray[a]}):this.options.translate?this.customTrFn=this.options.translate:this.customTrFn=function(a){return String(a)},this.options.vertical&&(this.positionProperty="bottom",this.dimensionProperty="height")},resetSlider:function(){this.manageElementsStyle(),this.addAccessibility(),this.setMinAndMax(),this.updateCeilLab(),this.updateFloorLab(),this.unbindEvents(),this.manageEventsBindings(),this.setDisabledState(),this.calcViewDimensions()},initElemHandles:function(){a.forEach(this.sliderElem.children(),function(b,c){var d=a.element(b);switch(c){case 0:this.fullBar=d;break;case 1:this.selBar=d;break;case 2:this.minH=d;break;case 3:this.maxH=d;break;case 4:this.flrLab=d;break;case 5:this.ceilLab=d;break;case 6:this.minLab=d;break;case 7:this.maxLab=d;break;case 8:this.cmbLab=d;break;case 9:this.ticks=d}},this),this.selBar.rzsp=0,this.minH.rzsp=0,this.maxH.rzsp=0,this.flrLab.rzsp=0,this.ceilLab.rzsp=0,this.minLab.rzsp=0,this.maxLab.rzsp=0,this.cmbLab.rzsp=0},manageElementsStyle:function(){this.range?this.maxH.css("display",""):this.maxH.css("display","none"),this.alwaysHide(this.flrLab,this.options.showTicksValues||this.options.hideLimitLabels),this.alwaysHide(this.ceilLab,this.options.showTicksValues||this.options.hideLimitLabels),this.alwaysHide(this.minLab,this.options.showTicksValues),this.alwaysHide(this.maxLab,this.options.showTicksValues||!this.range),this.alwaysHide(this.cmbLab,this.options.showTicksValues||!this.range),this.alwaysHide(this.selBar,!this.range&&!this.options.showSelectionBar),this.options.vertical&&this.sliderElem.addClass("vertical"),this.options.draggableRange?this.selBar.addClass("rz-draggable"):this.selBar.removeClass("rz-draggable")},alwaysHide:function(a,b){a.rzAlwaysHide=b,b?this.hideEl(a):this.showEl(a)},manageEventsBindings:function(){this.options.disabled||this.options.readOnly?this.unbindEvents():this.bindEvents()},setDisabledState:function(){this.options.disabled?this.sliderElem.attr("disabled","disabled"):this.sliderElem.attr("disabled",null)},resetLabelsValue:function(){this.minLab.rzsv=void 0,this.maxLab.rzsv=void 0},initHandles:function(){this.updateLowHandle(this.valueToOffset(this.scope.rzSliderModel)),this.range&&this.updateHighHandle(this.valueToOffset(this.scope.rzSliderHigh)),this.updateSelectionBar(),this.range&&this.updateCmbLabel(),this.updateTicksScale()},translateFn:function(a,b,c){c=void 0===c?!0:c;var d=String(c?this.customTrFn(a,this.options.id):a),e=!1;(void 0===b.rzsv||b.rzsv.length!==d.length||b.rzsv.length>0&&0===b.rzsd)&&(e=!0,b.rzsv=d),b.text(d),e&&this.getDimension(b)},setMinAndMax:function(){this.step=+this.options.step,this.precision=+this.options.precision,this.scope.rzSliderModel=this.roundStep(this.scope.rzSliderModel),this.range&&(this.scope.rzSliderHigh=this.roundStep(this.scope.rzSliderHigh)),this.minValue=this.roundStep(+this.options.floor),null!=this.options.ceil?this.maxValue=this.roundStep(+this.options.ceil):this.maxValue=this.options.ceil=this.range?this.scope.rzSliderHigh:this.scope.rzSliderModel,this.options.enforceRange&&(this.scope.rzSliderModel=this.sanitizeValue(this.scope.rzSliderModel),this.range&&(this.scope.rzSliderHigh=this.sanitizeValue(this.scope.rzSliderHigh))),this.valueRange=this.maxValue-this.minValue},addAccessibility:function(){this.minH.attr("role","slider"),this.updateAriaAttributes(),!this.options.keyboardSupport||this.options.readOnly||this.options.disabled?this.minH.attr("tabindex",""):this.minH.attr("tabindex","0"),this.options.vertical&&this.minH.attr("aria-orientation","vertical"),this.range&&(this.maxH.attr("role","slider"),!this.options.keyboardSupport||this.options.readOnly||this.options.disabled?this.maxH.attr("tabindex",""):this.maxH.attr("tabindex","0"),this.options.vertical&&this.maxH.attr("aria-orientation","vertical"))},updateAriaAttributes:function(){this.minH.attr({"aria-valuenow":this.scope.rzSliderModel,"aria-valuetext":this.customTrFn(this.scope.rzSliderModel),"aria-valuemin":this.minValue,"aria-valuemax":this.maxValue}),this.range&&this.maxH.attr({"aria-valuenow":this.scope.rzSliderHigh,"aria-valuetext":this.customTrFn(this.scope.rzSliderHigh),"aria-valuemin":this.minValue,"aria-valuemax":this.maxValue})},calcViewDimensions:function(){var a=this.getDimension(this.minH);this.handleHalfDim=a/2,this.barDimension=this.getDimension(this.fullBar),this.maxPos=this.barDimension-a,this.getDimension(this.sliderElem),this.sliderElem.rzsp=this.sliderElem[0].getBoundingClientRect()[this.positionProperty],this.initHasRun&&(this.updateFloorLab(),this.updateCeilLab(),this.initHandles())},updateTicksScale:function(){if(this.options.showTicks){var a=Math.round((this.maxValue-this.minValue)/this.step)+1;this.scope.ticks=[];for(var b=0;a>b;b++){var c=this.roundStep(this.minValue+b*this.step),d={selected:this.isTickSelected(c)};d.selected&&this.options.getSelectionBarColor&&(d.style={"background-color":this.getSelectionBarColor()}),this.options.ticksTooltip&&(d.tooltip=this.options.ticksTooltip(c),d.tooltipPlacement=this.options.vertical?"right":"top"),this.options.showTicksValues&&(d.value=this.getDisplayValue(c),this.options.ticksValuesTooltip&&(d.valueTooltip=this.options.ticksValuesTooltip(c),d.valueTooltipPlacement=this.options.vertical?"right":"top")),this.scope.ticks.push(d)}}},isTickSelected:function(a){return!this.range&&this.options.showSelectionBar&&a<=this.scope.rzSliderModel?!0:this.range&&a>=this.scope.rzSliderModel&&a<=this.scope.rzSliderHigh?!0:!1},updateCeilLab:function(){this.translateFn(this.maxValue,this.ceilLab),this.setPosition(this.ceilLab,this.barDimension-this.ceilLab.rzsd),this.getDimension(this.ceilLab)},updateFloorLab:function(){this.translateFn(this.minValue,this.flrLab),this.getDimension(this.flrLab)},callOnStart:function(){this.options.onStart&&this.options.onStart(this.options.id)},callOnChange:function(){this.options.onChange&&this.options.onChange(this.options.id)},callOnEnd:function(){if(this.options.onEnd){var a=this;b(function(){a.options.onEnd(a.options.id)})}},updateHandles:function(a,b){"rzSliderModel"===a?this.updateLowHandle(b):"rzSliderHigh"===a&&this.updateHighHandle(b),this.updateSelectionBar(),this.updateTicksScale(),this.range&&this.updateCmbLabel()},updateLowHandle:function(a){this.setPosition(this.minH,a),this.translateFn(this.scope.rzSliderModel,this.minLab);var b=Math.min(Math.max(a-this.minLab.rzsd/2+this.handleHalfDim,0),this.barDimension-this.ceilLab.rzsd);this.setPosition(this.minLab,b),this.shFloorCeil()},updateHighHandle:function(a){this.setPosition(this.maxH,a),this.translateFn(this.scope.rzSliderHigh,this.maxLab);var b=Math.min(a-this.maxLab.rzsd/2+this.handleHalfDim,this.barDimension-this.ceilLab.rzsd);this.setPosition(this.maxLab,b),this.shFloorCeil()},shFloorCeil:function(){var a=!1,b=!1;this.minLab.rzsp<=this.flrLab.rzsp+this.flrLab.rzsd+5?(a=!0,this.hideEl(this.flrLab)):(a=!1,this.showEl(this.flrLab)),this.minLab.rzsp+this.minLab.rzsd>=this.ceilLab.rzsp-this.handleHalfDim-10?(b=!0,this.hideEl(this.ceilLab)):(b=!1,this.showEl(this.ceilLab)),this.range&&(this.maxLab.rzsp+this.maxLab.rzsd>=this.ceilLab.rzsp-10?this.hideEl(this.ceilLab):b||this.showEl(this.ceilLab),this.maxLab.rzsp<=this.flrLab.rzsp+this.flrLab.rzsd+this.handleHalfDim?this.hideEl(this.flrLab):a||this.showEl(this.flrLab))},updateSelectionBar:function(){var a=0,b=0;if(this.range||!this.options.showSelectionBarEnd?(b=Math.abs(this.maxH.rzsp-this.minH.rzsp)+this.handleHalfDim,a=this.range?this.minH.rzsp+this.handleHalfDim:0):(b=Math.abs(this.maxPos-this.minH.rzsp)+this.handleHalfDim,a=this.minH.rzsp+this.handleHalfDim),this.setDimension(this.selBar,b),this.setPosition(this.selBar,a),this.options.getSelectionBarColor){var c=this.getSelectionBarColor();this.scope.barStyle={backgroundColor:c}}},getSelectionBarColor:function(){return this.range?this.options.getSelectionBarColor(this.scope.rzSliderModel,this.scope.rzSliderHigh):this.options.getSelectionBarColor(this.scope.rzSliderModel)},updateCmbLabel:function(){var a,b;if(this.minLab.rzsp+this.minLab.rzsd+10>=this.maxLab.rzsp){a=this.getDisplayValue(this.scope.rzSliderModel),b=this.getDisplayValue(this.scope.rzSliderHigh),this.translateFn(a+" - "+b,this.cmbLab,!1);var c=Math.min(Math.max(this.selBar.rzsp+this.selBar.rzsd/2-this.cmbLab.rzsd/2,0),this.barDimension-this.cmbLab.rzsd);this.setPosition(this.cmbLab,c),this.hideEl(this.minLab),this.hideEl(this.maxLab),this.showEl(this.cmbLab)}else this.showEl(this.maxLab),this.showEl(this.minLab),this.hideEl(this.cmbLab)},getDisplayValue:function(a){return this.customTrFn(a,this.options.id)},roundStep:function(a){var b=parseFloat(a/this.step).toPrecision(12);return b=Math.round(b)*this.step,b=b.toFixed(this.precision),+b},hideEl:function(a){return a.css({opacity:0})},showEl:function(a){return a.rzAlwaysHide?a:a.css({opacity:1})},setPosition:function(a,b){a.rzsp=b;var c={};return c[this.positionProperty]=b+"px",a.css(c),b},getDimension:function(a){var b=a[0].getBoundingClientRect();return this.options.vertical?a.rzsd=(b.bottom-b.top)*this.options.scale:a.rzsd=(b.right-b.left)*this.options.scale,a.rzsd},setDimension:function(a,b){a.rzsd=b;var c={};return c[this.dimensionProperty]=b+"px",a.css(c),b},valueToOffset:function(a){return(this.sanitizeValue(a)-this.minValue)*this.maxPos/this.valueRange||0},sanitizeValue:function(a){return Math.min(Math.max(a,this.minValue),this.maxValue)},offsetToValue:function(a){return a/this.maxPos*this.valueRange+this.minValue},getEventXY:function(a){var b=this.options.vertical?"clientY":"clientX";return b in a?a[b]:void 0===a.originalEvent?a.touches[0][b]:a.originalEvent.touches[0][b]},getEventPosition:function(a){var b=this.sliderElem.rzsp,c=0;return c=this.options.vertical?-this.getEventXY(a)+b:this.getEventXY(a)-b,(c-this.handleHalfDim)*this.options.scale},getEventNames:function(a){var b={moveEvent:"",endEvent:""};return a.touches||void 0!==a.originalEvent&&a.originalEvent.touches?(b.moveEvent="touchmove",b.endEvent="touchend"):(b.moveEvent="mousemove",b.endEvent="mouseup"),b},getNearestHandle:function(a){if(!this.range)return this.minH;var b=this.getEventPosition(a);return Math.abs(b-this.minH.rzsp)<Math.abs(b-this.maxH.rzsp)?this.minH:this.maxH},focusElement:function(a){var b=0;a[b].focus()},bindEvents:function(){var b,c,d;this.options.draggableRange?(b="rzSliderDrag",c=this.onDragStart,d=this.onDragMove):(b="rzSliderModel",c=this.onStart,d=this.onMove),this.options.onlyBindHandles||(this.selBar.on("mousedown",a.bind(this,c,null,b)),this.selBar.on("mousedown",a.bind(this,d,this.selBar))),this.options.draggableRangeOnly?(this.minH.on("mousedown",a.bind(this,c,null,b)),this.maxH.on("mousedown",a.bind(this,c,null,b))):(this.minH.on("mousedown",a.bind(this,this.onStart,this.minH,"rzSliderModel")),this.range&&this.maxH.on("mousedown",a.bind(this,this.onStart,this.maxH,"rzSliderHigh")),this.options.onlyBindHandles||(this.fullBar.on("mousedown",a.bind(this,this.onStart,null,null)),this.fullBar.on("mousedown",a.bind(this,this.onMove,this.fullBar)),this.ticks.on("mousedown",a.bind(this,this.onStart,null,null)),this.ticks.on("mousedown",a.bind(this,this.onMove,this.ticks)))),this.options.onlyBindHandles||(this.selBar.on("touchstart",a.bind(this,c,null,b)),this.selBar.on("touchstart",a.bind(this,d,this.selBar))),this.options.draggableRangeOnly?(this.minH.on("touchstart",a.bind(this,c,null,b)),this.maxH.on("touchstart",a.bind(this,c,null,b))):(this.minH.on("touchstart",a.bind(this,this.onStart,this.minH,"rzSliderModel")),this.range&&this.maxH.on("touchstart",a.bind(this,this.onStart,this.maxH,"rzSliderHigh")),this.options.onlyBindHandles||(this.fullBar.on("touchstart",a.bind(this,this.onStart,null,null)),this.fullBar.on("touchstart",a.bind(this,this.onMove,this.fullBar)),this.ticks.on("touchstart",a.bind(this,this.onStart,null,null)),this.ticks.on("touchstart",a.bind(this,this.onMove,this.ticks)))),this.options.keyboardSupport&&(this.minH.on("focus",a.bind(this,this.onPointerFocus,this.minH,"rzSliderModel")),this.range&&this.maxH.on("focus",a.bind(this,this.onPointerFocus,this.maxH,"rzSliderHigh")))},unbindEvents:function(){this.minH.off(),this.maxH.off(),this.fullBar.off(),this.selBar.off(),this.ticks.off()},onStart:function(b,d,e){var f,g,h=this.getEventNames(e);e.stopPropagation(),e.preventDefault(),this.calcViewDimensions(),b?this.tracking=d:(b=this.getNearestHandle(e),this.tracking=b===this.minH?"rzSliderModel":"rzSliderHigh"),b.addClass("rz-active"),this.options.keyboardSupport&&this.focusElement(b),f=a.bind(this,this.dragging.active?this.onDragMove:this.onMove,b),g=a.bind(this,this.onEnd,f),c.on(h.moveEvent,f),c.one(h.endEvent,g),this.callOnStart()},onMove:function(a,b){var c,d=this.getEventPosition(b);if(0>=d){if(0===a.rzsp)return;c=this.minValue,d=0}else if(d>=this.maxPos){if(a.rzsp===this.maxPos)return;c=this.maxValue,d=this.maxPos}else c=this.offsetToValue(d),c=this.roundStep(c),d=this.valueToOffset(c);this.positionTrackingHandle(c,d)},onEnd:function(a,b){var d=this.getEventNames(b).moveEvent;this.options.keyboardSupport||(this.minH.removeClass("rz-active"),this.maxH.removeClass("rz-active"),this.tracking=""),this.dragging.active=!1,c.off(d,a),this.scope.$emit("slideEnded"),this.callOnEnd()},onPointerFocus:function(b,c){this.tracking=c,b.one("blur",a.bind(this,this.onPointerBlur,b)),b.on("keydown",a.bind(this,this.onKeyboardEvent)),b.addClass("rz-active")},onPointerBlur:function(a){a.off("keydown"),this.tracking="",a.removeClass("rz-active")},onKeyboardEvent:function(a){var b=this.scope[this.tracking],c=a.keyCode||a.which,d={38:"UP",40:"DOWN",37:"LEFT",39:"RIGHT",33:"PAGEUP",34:"PAGEDOWN",36:"HOME",35:"END"},e={UP:b+this.step,DOWN:b-this.step,LEFT:b-this.step,RIGHT:b+this.step,PAGEUP:b+this.valueRange/10,PAGEDOWN:b-this.valueRange/10,HOME:this.minValue,END:this.maxValue},f=d[c],g=e[f];if(null!=g&&""!==this.tracking){a.preventDefault();var h=this.roundStep(this.sanitizeValue(g)),i=this.valueToOffset(h);if(this.options.draggableRangeOnly){var j,k,l,m,n=this.scope.rzSliderHigh-this.scope.rzSliderModel;"rzSliderModel"===this.tracking?(l=h,j=i,m=h+n,m>this.maxValue&&(m=this.maxValue,l=m-n,j=this.valueToOffset(l)),k=this.valueToOffset(m)):(m=h,k=i,l=h-n,l<this.minValue&&(l=this.minValue,m=l+n,k=this.valueToOffset(m)),j=this.valueToOffset(l)),this.positionTrackingBar(l,m,j,k)}else this.positionTrackingHandle(h,i)}},onDragStart:function(a,b,c){var d=this.getEventPosition(c);this.dragging={active:!0,value:this.offsetToValue(d),difference:this.scope.rzSliderHigh-this.scope.rzSliderModel,lowLimit:d-this.minH.rzsp,highLimit:this.maxH.rzsp-d},this.onStart(a,b,c)},onDragMove:function(a,b){var c,d,e,f,g=this.getEventPosition(b);if(g<=this.dragging.lowLimit){if(0===this.minH.rzsp)return;e=this.minValue,c=0,f=this.minValue+this.dragging.difference,d=this.valueToOffset(f)}else if(g>=this.maxPos-this.dragging.highLimit){if(this.maxH.rzsp===this.maxPos)return;f=this.maxValue,d=this.maxPos,e=this.maxValue-this.dragging.difference,c=this.valueToOffset(e)}else e=this.offsetToValue(g-this.dragging.lowLimit),e=this.roundStep(e),c=this.valueToOffset(e),f=e+this.dragging.difference,d=this.valueToOffset(f);this.positionTrackingBar(e,f,c,d)},positionTrackingBar:function(a,b,c,d){this.scope.rzSliderModel=a,this.scope.rzSliderHigh=b,this.updateHandles("rzSliderModel",c),this.updateHandles("rzSliderHigh",d),this.applyModel()},positionTrackingHandle:function(a,b){var c=!1,d=!1;return this.range&&("rzSliderModel"===this.tracking&&a>=this.scope.rzSliderHigh?(d=!0,this.scope[this.tracking]=this.scope.rzSliderHigh,this.updateHandles(this.tracking,this.maxH.rzsp),this.updateAriaAttributes(),this.tracking="rzSliderHigh",this.minH.removeClass("rz-active"),this.maxH.addClass("rz-active"),this.options.keyboardSupport&&this.focusElement(this.maxH),c=!0):"rzSliderHigh"===this.tracking&&a<=this.scope.rzSliderModel&&(d=!0,this.scope[this.tracking]=this.scope.rzSliderModel,this.updateHandles(this.tracking,this.minH.rzsp),this.updateAriaAttributes(),this.tracking="rzSliderModel",this.maxH.removeClass("rz-active"),this.minH.addClass("rz-active"),this.options.keyboardSupport&&this.focusElement(this.minH),c=!0)),this.scope[this.tracking]!==a&&(this.scope[this.tracking]=a,this.updateHandles(this.tracking,b),this.updateAriaAttributes(),c=!0),c&&this.applyModel(),d},applyModel:function(){this.internalChange=!0,this.scope.$apply(),this.callOnChange(),this.internalChange=!1}},h}]).directive("rzslider",["RzSlider",function(a){return{restrict:"E",scope:{rzSliderModel:"=?",rzSliderHigh:"=?",rzSliderOptions:"=?",rzSliderTplUrl:"@"},templateUrl:function(a,b){return b.rzSliderTplUrl||"rzSliderTpl.html"},link:function(b,c){b.slider=new a(b,c)}}}]);return b.run(["$templateCache",function(a){a.put("rzSliderTpl.html",'<span class=rz-bar-wrapper><span class=rz-bar></span></span> <span class=rz-bar-wrapper><span class="rz-bar rz-selection" ng-style=barStyle></span></span> <span class=rz-pointer></span> <span class=rz-pointer></span> <span class="rz-bubble rz-limit"></span> <span class="rz-bubble rz-limit"></span> <span class=rz-bubble></span> <span class=rz-bubble></span> <span class=rz-bubble></span><ul ng-show=showTicks class=rz-ticks><li ng-repeat="t in ticks track by $index" class=tick ng-class="{selected: t.selected}" ng-style=t.style ng-attr-uib-tooltip="{{ t.tooltip }}" ng-attr-tooltip-placement={{t.tooltipPlacement}} ng-attr-tooltip-append-to-body="{{ t.tooltip ? true : undefined}}"><span ng-if="t.value != null" class=tick-value ng-attr-uib-tooltip="{{ t.valueTooltip }}" ng-attr-tooltip-placement={{t.valueTooltipPlacement}}>{{ t.value }}</span></li></ul>')}]),b});
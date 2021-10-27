"use strict";

var gl;
const MAX_POINTS = 50;
var index = 0;
var cindex = 0;
var active = false;

window.onload = function init() {
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );


    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  
    gl.bufferData(gl.ARRAY_BUFFER, sizeof['vec2'] * MAX_POINTS, gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
 

    gl.bufferData(gl.ARRAY_BUFFER, sizeof['vec4'] * MAX_POINTS, gl.STATIC_DRAW);
    var vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

//array of our colors
    var colors = [
        vec4(0.0, 0.0, 0.0, 1.0), //black
        vec4(1.0, 0.0, 0.0, 1.0), //red 
        vec4(1.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 0.0, 1.0, 1.0),
        vec4(1.0, 0.0, 1.0, 1.0),
        vec4(0.0, 1.0, 1.0, 1.0)
    ];

    var c = document.getElementById("colors");
    c.value = cindex;
    c.addEventListener("click", function(){
        cindex = c.selectedIndex;
    });
    
    canvas.addEventListener("click", function(){
        active = false;
       index++;
    });

    canvas.addEventListener("mousemove", function(event){
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        var t = vec2(2*event.clientX/canvas.width-1,
                    2*(canvas.height-event.clientY)/canvas.height-1);
                gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec2'] * index,flatten(t));

                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                t = vec4(colors[cindex]);
                gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec4'] * index, flatten(t));
                active = true;
                });

    render();
}

function Clear(){
    index = 0;
    gl.clear(gl.COLOR_BUFFER_BIT);
    colors = 0;
    };

    function render() {
        gl.clear( gl.COLOR_BUFFER_BIT);
        if(active){
        gl.drawArrays(gl.LINE_STRIP, 0, index + 1);
        gl.drawArrays(gl.POINTS, index, 1);
    }
        else{
        gl.drawArrays(gl.LINE_STRIP, 0, index);
        }

        window.requestAnimationFrame(render);
    }

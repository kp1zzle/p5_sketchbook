# Pixel Painter
Pixel Painter is an online platform to create animated, parametric art pieces.

## Pixel Painter Command Language (PPCL)
In PPCL, one line defines one frame of the animation. 

### Commands
#### Directional
`up` Move the kernel up one pixel.

`down` Move the kernel down one pixel.

`left` Move the kernel left one pixel.

`right` Move the kernel right one pixel.

Note that multiple directional commands can be combined in the same command line (for diagonal motion).

#### Kernel
`kernelSize=10` Sets the side length of the kernel.

`kernelMode=solid` Sets the kernel mode.

`kernelParam=2` Sets the optional param for the kernel. The effect of the optional param depends on the kernel mode. 

`kernelColor=0,0,0` Sets the rgb values for the kernel color. 

#### Misc
`invert` Inverts all colors in the image. 

`togglePen` Toggles the kernel writing on the canvas. 

`penUp` Sets the pen to not write on the canvas.

`penDown` Sets the pen to write on the canvas. 


### Control structures
Only two simple control structures exist in PPCL: line repetition and block repetition.
#### Line repetition
Prepend a command line with an integer N to repeat that N command.

`5 up` - 5 frames of up animation
#### Block repetition
Wrap a block in parens prepended with an integer N to repeat the block N times. Note that the parens MUST have their own lines.

```
3 (
up
down
left
)
invert
```

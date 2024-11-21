-- -----------------------------------------------------------------------------------
-- Importar
-- -----------------------------------------------------------------------------------

local composer = require("composer")
local relayout = require("relayout")
local utilities = require("utilities")



-- -----------------------------------------------------------------------------------
-- Establecer variables
-- -----------------------------------------------------------------------------------

-- Layout
local _W, _H, _CX, _CY = relayout._W, relayout._H, relayout._CX, relayout._CY

-- Scene
local scene = composer.newScene()

-- Grupos
local grpMain



-- -----------------------------------------------------------------------------------
-- Funciones de eventos de escena
-- -----------------------------------------------------------------------------------

-- create()
function scene:create( event )
  print("scene:create - menu")

  -- Crear grupo principal e insertar en escena
  grpMain = display.newGroup()

  self.view:insert(grpMain)

  -- Insertar objetos en grpMain aquí

  local bg = display.newImageRect("background.png", _W, _H)
  bg.x = _CX
  bg.y = _CY
  grpMain:insert(bg)

  --

  local btnPlay = display.newText("Tap to start", _CX, _CY, "PressStart2P-Regular.ttf", 25)
  grpMain:insert(btnPlay)

  btnPlay:addEventListener("tap", function() 
    composer.gotoScene("scenes.game")
  end)
end



-- show()
function scene:show( event )
  if ( event.phase == "will" ) then
  elseif ( event.phase == "did" ) then
  end
end



-- esconder()
function scene:hide( event )
  if ( event.phase == "will" ) then
  elseif ( event.phase == "did" ) then
  end
end



-- destruir()
function scene:destroy(event)
  if event.phase == "will" then
  end
end



-- -----------------------------------------------------------------------------------
-- Escuchadores de funciones de eventos de escena
-- -----------------------------------------------------------------------------------
scene:addEventListener( "create", scene )
scene:addEventListener( "show", scene )
scene:addEventListener( "hide", scene )
scene:addEventListener( "destroy", scene )
-- -----------------------------------------------------------------------------------

return scene

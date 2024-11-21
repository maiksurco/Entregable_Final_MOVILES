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
-- Funciones locales
-- -----------------------------------------------------------------------------------

local function restartGame()
  -- Redirige a la escena del juego
  composer.gotoScene("scenes.game")
end

-- -----------------------------------------------------------------------------------
-- Funciones de eventos de escena
-- -----------------------------------------------------------------------------------

-- crear()
function scene:create( event )
  print("scene:create - gameover")

  -- Crear grupo principal e insertar en escena
  grpMain = display.newGroup()

  self.view:insert(grpMain)

  -- Insertar objetos en grpMain aquí
  local bg = display.newImageRect("background.png", _W, _H)
  bg.x = _CX
  bg.y = _CY
  grpMain:insert(bg)

  -- Recuperar los datos del juego
  local score = composer.getVariable("finalScore") or utilities:getPreviousScore()  -- Si no se ha establecido, se usa el puntaje anterior
  local timePlayed = composer.getVariable("finalTimePlayed") or 0  -- Tiempo jugado
  local livesLost = composer.getVariable("finalLivesLost") or 0  -- Vidas perdidas

  -- Mostrar puntaje y tiempo
  local lblScore = display.newText("Score: " .. score, _CX, _CY, "PressStart2P-Regular.ttf", 20)
  grpMain:insert(lblScore)

  local lblTimePlayed = display.newText("Time Played: " .. timePlayed .. "s", _CX, _CY + 30, "PressStart2P-Regular.ttf", 16)
  grpMain:insert(lblTimePlayed)

  local lblLivesLost = display.newText("Lives Lost: " .. livesLost, _CX, _CY + 60, "PressStart2P-Regular.ttf", 16)
  grpMain:insert(lblLivesLost)

  -- Verificar si es un nuevo récord
  local isHighScore = utilities:setHighScore(score)

  local lblHighScore = display.newText("Highcore: " .. utilities:getHighscore(), _CX, _CY + 90, "PressStart2P-Regular.ttf", 16)
  grpMain:insert(lblHighScore)

  if isHighScore then
    local lblNewHighscore = display.newText("New Highscore :D", _CX, _CY - 50, "PressStart2P-Regular.ttf", 20)
    grpMain:insert(lblNewHighscore)
  end

  -- Añadir botón de reinicio
  local btnRestart = display.newRect(_CX, _CY + 120, 150, 50)
  btnRestart:setFillColor(0.2, 0.6, 1) -- Color azul
  grpMain:insert(btnRestart)

  local lblRestart = display.newText("Reini", _CX, _CY + 120, "PressStart2P-Regular.ttf", 16)
  grpMain:insert(lblRestart)

  -- Añadir evento al botón
  btnRestart:addEventListener("tap", restartGame)

end

-- show()
function scene:show( event )
  if ( event.phase == "will" ) then
  elseif ( event.phase == "did" ) then
  end
end

-- hide()
function scene:hide( event )
  if ( event.phase == "will" ) then
  elseif ( event.phase == "did" ) then
  end
end

-- destroy()
function scene:destroy(event)
  if event.phase == "will" then
  end
end

-- -----------------------------------------------------------------------------------
-- Escuchar los eventos de la escena
-- -----------------------------------------------------------------------------------
scene:addEventListener( "create", scene )
scene:addEventListener( "show", scene )
scene:addEventListener( "hide", scene )
scene:addEventListener( "destroy", scene )
-- -----------------------------------------------------------------------------------

return scene

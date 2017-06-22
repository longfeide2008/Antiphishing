;ControlFocus("title","text",controlID) Edit1=Edit instance 1
ControlFocus("Áí´æÎª", "","Edit1")


; Wait 10 seconds for the Upload window to appear
  WinWait("[CLASS:#32770]","",8)


; Set the File name text on the Edit field

  ControlSetText("Áí´æÎª", "", "Edit1", $CmdLine[1])

  Sleep(2000)

; Click on the Open button

  ControlClick("Áí´æÎª", "","Button2");
JavaScript MVC based Todo App

============================

MVC is a design pattern that deals with separation of concerns among different layers in an application. 

Here, the different layers are Modal, View and Controller.
Model (M) is an abstraction of a data source.
View (V) knows how to render the UI.
Controller (C) handles user driven events and communicates with Modal and View in response to those events.

=============================

In this demo,
Modal never interact with View and Controller. In other words, Modal is unaware of the existence of View and Controller.
View never interact with Modal and Controller.
Whereas, Modal interacts with View and Controller.

==============================

This is a simple ToDo app to track task related activity workflow.

A task can be in any of the three states viz. Todo, Doing and Done.
Task related cards can be created, updated or deleted under any of the above states.
These cards can also be sorted or moved to other states.
For example, you can move a card from Todo state to Doing or Done state.

All card related data is stored in HTML5 local storage and it is created, updated and deleted by Modal.
Controller handles user interaction and communicates the Modal data/user interaction data to View so that it can update the UI.

==============================

Screenshot

![alt tag](https://raw.githubusercontent.com/hemantsshetty/javascript-mvc/1ecb40cd971634e8235e6f142b485d513ea4c17c/screenshot/todo1.png)

![alt tag](https://raw.githubusercontent.com/hemantsshetty/javascript-mvc/1ecb40cd971634e8235e6f142b485d513ea4c17c/screenshot/todo2.png)

![alt tag](https://raw.githubusercontent.com/hemantsshetty/javascript-mvc/1ecb40cd971634e8235e6f142b485d513ea4c17c/screenshot/todo3.png)

![alt tag](https://raw.githubusercontent.com/hemantsshetty/javascript-mvc/1ecb40cd971634e8235e6f142b485d513ea4c17c/screenshot/todo4.png)

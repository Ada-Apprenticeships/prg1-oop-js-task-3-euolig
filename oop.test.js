const { PRIORITY, validInteger, validatePriority, Task, todaysDate, ToDo } = require('./oop.js');

// Run the tests by typing npm test in the terminal below


describe('OOP function tests', () => {
    test("T01_ValidIntegerOperations", async function() {
        for (let i = 0; i < 21; i++ ) {
          expect( validInteger( i ) ).toBe( true );
          expect( validInteger( String(i) ) ).toBe( true );
        }
      
        for (let i = -20; i < 0; i++ ) {
          expect( validInteger( i ) ).toBe( false );
          expect( validInteger( String(i) ) ).toBe( false );
        }
      
        let l1 = [ -0, 0.0, 1.0 ];
        for(let i of l1){
          expect( validInteger( i ) ).toBe( true );
        }
      
        let l2 = [ 1.2, -1.0 ]; // unlike python js rounds numbers so 1.0 = 1
        for(let i of l2){
          expect( validInteger( i ) ).toBe( false );
        }
      
        let l3 = [ '-0', 'A','0A', '1.0', 'A0', '', ' ', '.' ];
        for(let i of l3){
          expect( validInteger( i ) ).toBe( false );
        }
      
    });


    test("T02_ValidPriorityOperations", async function() {
        let l1 = [ 1, 3, 5, 7 ]; // valid so no change
        for(let i of l1){
         expect( validatePriority( i ) ).toBe( i );
         expect( validatePriority( String(i) ) ).toBe( i );
        }
     
        let l2 = [ 0, 2, 4, 6, 8 ]; // invalid so default 1
        for(let i of l2){
         expect( validatePriority( i ) ).toBe( 1 );
         expect( validatePriority( String(i) ) ).toBe( 1 );
        }
     
     
        let l3 = [ 'A', 'A0', '0A', '.', ' ' ]; // invalid so default 1
        for(let i of l3){
         expect( validatePriority( i ) ).toBe( 1 );
         expect( validatePriority( String(i) ) ).toBe( 1 );
        }
     
    });

    
    test("T03_ValidDateTimeNowOperations", async function() {
        let today = new Date(); // get the current date and timestamp
        let date = today.getDate().toString().padStart(2, '0') + '/' + 
                   (today.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                   today.getFullYear();
        let time = today.getHours().toString().padStart(2, '0') + ':' + 
                   today.getMinutes().toString().padStart(2, '0') + ':' + 
                   today.getSeconds().toString().padStart(2, '0');
        let now = date + ' ' + time;
        
        expect(now).toBe(todaysDate());
    });
      

    test("T04_CheckTaskAttributes", async function() {
        let today = new Date(); // get the current date and timestamp
        let date = today.getDate().toString().padStart(2, '0') + '/' + 
                   (today.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                   today.getFullYear();
        let time = today.getHours().toString().padStart(2, '0') + ':' + 
                   today.getMinutes().toString().padStart(2, '0') + ':' + 
                   today.getSeconds().toString().padStart(2, '0');
        let now = date + ' ' + time;
        
        task = new Task('T1', PRIORITY['LOW'] )
        
        expect(task['#added']).toBeUndefined();
        expect(task['#title']).toBeUndefined();
        expect(task['#priority']).toBeUndefined();
      
    });


    test("T05_CheckTaskClassRWAccessors", async function() {
       let x = new Task();
       expect(typeof(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(x), 'added').get )).toBe ( 'function' );
       expect(typeof(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(x), 'added').set )).toBe ( 'undefined' );
       
       expect(typeof(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(x), 'title').get )).toBe ( 'function' );
       expect(typeof(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(x), 'title').set )).toBe ( 'undefined' );
       
       expect(typeof(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(x), 'priority').get )).toBe ( 'function' );
       expect(typeof(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(x), 'priority').set )).toBe ( 'function' );
     
     
    });  


    test("T06_TaskClassBehaviour", async function() {
        let task = new Task('T1', PRIORITY['LOW'] )
        expect( task.priority ).toBe( PRIORITY['LOW'] );
        
        task.priority = PRIORITY['HIGH']
        expect( task.priority ).toBe( PRIORITY['HIGH'] );
        
        task.priority = 0
        expect( task.priority ).toBe( PRIORITY['LOW'] );
      
        task.priority = 10
        expect( task.priority ).toBe( PRIORITY['LOW'] );
      
    });


    test("T07_CheckToDoClassFunctions", async function() {
        let y = new ToDo();
        expect ( typeof(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(y), 'add').value) ).toBe('function')
        expect ( typeof(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(y), 'remove').value) ).toBe('function')
        expect ( typeof(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(y), 'list').value) ).toBe('function')
        expect ( typeof(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(y), 'task').value) ).toBe('function')
      
    });


    test("T08_ToDoClassBehaviourAddListRemove", async function() {
        let tasks = new ToDo();
      
        expect( tasks.add (new Task ('ACME T1', PRIORITY [ 'LOW' ]) )).toBe( 1 );
        expect( tasks.add (new Task ('ACME T2', PRIORITY [ 'MEDIUM' ]) )).toBe( 2 );
        expect( tasks.add (new Task ('ACME T3', PRIORITY [ 'MEDIUM' ]) )).toBe( 3 );
        expect( tasks.add (new Task ('ACME T4', PRIORITY [ 'HIGH' ]) )).toBe( 4 );
        
      
        let a = tasks.list()
        expect( a.length ).toBe( 4 );
        expect( a[0].length ).toBe( 3 );
      
        expect( tasks.remove ('ACME T5') ).toBe( false );
        expect( tasks.remove ('ACME T4') ).toBe( true );
      
        a = tasks.list()
        expect( a.length ).toBe( 3 );
        expect( tasks.list() [1] [1] ).toBe( 'ACME T2' );
         
    });


    test("T09_ToDoClassTaskAccess", async function() {
  
        tasks = new ToDo ( )
      
        expect( tasks.add (new Task ('ACME T1', PRIORITY [ 'LOW' ])) ).toBe( 1 );
        expect( tasks.add (new Task ('ACME T2', PRIORITY [ 'MEDIUM' ])) ).toBe( 2 );
      
        expect(() => {
          let a = tasks.task ('ACME T9')
        }).toThrow("Task 'ACME T9' Not Found")
        
        tasks.task ('ACME T2').priority = PRIORITY [ 'URGENT' ]
        expect( tasks.task('ACME T2').priority ).toBe( PRIORITY [ 'URGENT' ] );
      
    });

});

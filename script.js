
    
    // tasks object
    let tasks = [       //           "title" : ,
                        //           "date": ,
                        //            "isDone": false

    ]

    function getTasksFromStorage() {
     let retrivedTasks =  tasks = JSON.parse(localStorage.getItem("tasks"))     // read from local storage to update the tasks when page is refreshing

     if (retrivedTasks == null) {
        tasks = []
     } else {
        tasks = retrivedTasks
     }

    }

    getTasksFromStorage()


    //  To fill in the tasks on the page from the tasks object
        function fillTasksOnThePage() {
            document.getElementById("tasks").innerHTML = ""    // Here to reset the content on the page
            let index = 0;
            for(task of tasks) {    // to do for loop on every element on {tasks} object
            
            
            
            let content =      // the html content
        `    
                    <!-- Task -->
                    <div class="task ${task.isDone ? 'taskComplete' : ''}">
                        
                        <!-- Tasks info -->
                        <div class="task-content" style="width: 70%; padding: 0px 40px 23px 0px; ">
                            <h2>${task.title}</h2>
                            <div class="task-content" style="display: flex; align-items: center;">
                                <span class="material-symbols-sharp">
                                    calendar_month
                                    </span>
                               <span style="padding-right: 8px;">${task.date}</span> 
                            </div>
                        </div>
                        <!-- // Tasks info -->

                        <!-- Tasks actions -->
                        <div style="display: flex; justify-content: space-between; align-items: center; width: 20%; ">
                            <button onClick="deleteTask(${index})" class="circular" style="background-color: rgb(114, 0, 0) ; color: white;">
                                <span class="material-symbols-sharp">
                                    delete
                                    </span>
                            </button>
                            <!-- Check if the task isDone , if it's done put cancel icon , if it's not done put the correct icon  -->
                            ${task.isDone ? `
                                <button onClick="toggleTaskCompletion(${index})" class="circular" style="background-color: rgb(118, 0, 101) ; color: white">
                                <span class="material-symbols-sharp">
                                    cancel
                                    </span>
                            </button>
                                ` : `
                            <button onClick="toggleTaskCompletion(${index})" class="circular" style="background-color: rgb(0, 150, 30) ; color: white">
                                <span class="material-symbols-sharp">
                                    done
                                    </span>
                            </button>
                            `}



                            <button onClick="updateTask(${index})" class="circular" style="background-color: rgba(0, 16, 197,0.629) ; color: white">
                                <span class="material-symbols-sharp">
                                    edit
                                </span>
                                
                            </button>
                        </div>
                        <!-- // Tasks actions -->



                    </div>
                    <!-- // Task // -->
                  
           `
                        // += to create content from the objects
                document.getElementById("tasks").innerHTML += content    // create a task from the code above , on every itrate
                
                    index++  // index increment to detect which task index to delete

            }  
        }

        fillTasksOnThePage()   // function call




            // add a new task functionality
            document.getElementById("add-btn").addEventListener("click", function() {
                taskNamePrompt = prompt("الرجاء ادخال عنوان المهمة") 
                
                if (taskNamePrompt == null || taskNamePrompt == "") {
                    prompt("الرجاء ادخال اسم للمهمة")
                } else {
                    let taskName = taskNamePrompt
                    let now = new Date()
                    let date = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear()   // 2023/6/12
                     let taskObj = {           // make a new object with this keys and values to push it in the original tasks obj
                         "title" : taskName,
                         "date": date,
                         "isDone": false
                     }
 
                    tasks.push(taskObj)   // push the object above to the original tasks
 
                     storeTasks()
 
                    fillTasksOnThePage()  // refill the tasks on the page after pushing
 
                }
              
      
                })


                // to delete a task , splice the array objects in which index it is
                function deleteTask(index) {
                    let isConfirm =  confirm("هل انت متأكد من حذف مهمة " + tasks[index].title + "؟")
                    
                    if (isConfirm) {
                     tasks.splice(index,1)
                     storeTasks()
                    fillTasksOnThePage()
                    }

                }       

                // to update a task
                function updateTask(index) {
                    let updatedContent = prompt("الرجاء تحديد عنوان المهمة الجديد")


                    if(updatedContent !== null) {
                    tasks[index].title = updatedContent
                    storeTasks()
                    fillTasksOnThePage()
                    } 
                }

                // is the task is complete ?
                function toggleTaskCompletion(index) {

                    let task = tasks[index]
                    task.isDone = !task.isDone
                    storeTasks()
                    fillTasksOnThePage()

                }



                // *********** STORAGE FUCTIONS *****************

                function storeTasks() {
                    let tasksString = JSON.stringify(tasks)     // convert all the json tasks to string
                   localStorage.setItem("tasks",tasksString)    // write tasks to local storage in string form

                }

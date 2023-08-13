   // Selector(s)
   var submitButton = document.getElementById(`submitButton`) //Submit button

   //Function to save checked genres into local storage 
   function saveForm() {
    var bookGenres = $("input[name='genre']:checked")
    var selectedGenres = [];
    $.each(bookGenres, function () {
        selectedGenres.push($(this).val());
      });
      selectedGenres.join();
      localStorage.setItem('genres', selectedGenres)
    }    

   submitButton.addEventListener(`click`, function () {    
       saveForm();
       // Gets the value of the toggle switch
       var toggleSwitch = document.getElementById(`flexSwitchCheckChecked`).checked
       // Save the toggle switch value in localStorage.
       localStorage.setItem('toggleSwitch', toggleSwitch);

       // Retrieves the value of toggle switch name.
       var toggleSwitch = localStorage.getItem('toggleSwitch');
       console.log(toggleSwitch)
   })
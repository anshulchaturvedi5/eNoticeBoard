document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar')
  const sidebarToggle = document.getElementById('sidebarToggle')
  const mainContent = document.querySelector('.main-content')

  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('open')
    if (sidebar.classList.contains('open')) {
      mainContent.style.marginLeft = '250px'
    } else {
      mainContent.style.marginLeft = '60px'
    }
  })

  const grid = GridStack.init({
    cellHeight: 80,
    verticalMargin: 10,
    resizable: { handles: 'all' }, // do all sides for testing
    sizetocontent: true,
  })
  let items = [
    {
      x: 0,
      y: 0,
      w: 4,
      h: 6,
      gs_min_w: 3,
      content: `<div class="google-slide-container">
                  <iframe src="widgets/pomodoro/pomodoro-timer.html" name="targetframe" allowTransparency="true" scrolling="yes" frameborder="0" > </iframe>                
                </div>
                <button class="remove-button">--------</button>`,
    },
    {
      x: 10,
      y: 0,
      w: 4,
      h: 5,
      noMove: true,
      noResize: true,
      locked: true,
      content: `
                <div class="google-slide-container">
                   <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSJ65jPtjjb_TpV4Xb_xVTRr_kc3tgwdVzXZ7u82d8vTThvZ9dDyjSjXvg-IXIGrND-MUYxiS0GGQFZ/embed?start=false&loop=true&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                </div>
                <button class="remove-button">--------</button>`,
    },
    {
      x: 8,
      y: 2,
      w: 4,
      h: 3,
      content: `<div class="google-slide-container">
                  <iframe src="widgets/quotes/quotes.html" name="targetframe" allowTransparency="true" scrolling="yes" frameborder="0" ></iframe>
                </div>
                <button class="remove-button">--------</button>`,
    },
    {
      x: 0,
      y: 2,
      w: 4,
      h: 3,
      content: `<div class="spotify-container">
                  <iframe src="https://open.spotify.com/embed/playlist/4kOdiP5gbzocwxQ8s2UTOF" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                </div>
                <button class="remove-button">--------</button>`,
    },
    {
      x: 4,
      y: 0,
      w: 4,
      h: 5,
      content: `<div class="google-slide-container">
                  <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=UTC&bgcolor=%23ffffff&showTitle=0&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%230B8043" style="border:solid 1px #777" width="800" height="600" frameborder="0" scrolling="no"></iframe>
                </div>
                <button class="remove-button">--------</button>`,
    },
    {
      x: 4,
      y: 2,
      w: 4,
      h: 8,
      content: `<div class="google-slide-container">
                   <iframe src="widgets/opportunity_board/opportunity_board.html" name="targetframe" allowTransparency="true" scrolling="yes" frameborder="0" ></iframe>
                </div>
                <button class="remove-button">--------</button>`,
    },
    {
      x: 8,
      y: 4,
      w: 4,
      h: 7,
      content: `<div class="notion-container">
                     <iframe src="widgets/issue_tracker/issue.html" name="targetframe" allowTransparency="true" scrolling="yes" frameborder="0" ></iframe>
                </div>
                <button class="remove-button">--------</button>`,
    },
  ]
  grid.load(items)


  document
    .getElementById('addTimerButton')
    .addEventListener('click', addPomodoroTimerWidget)
  document
    .getElementById('addSlideButton')
    .addEventListener('click', addGoogleSlideWidget)
  document
    .getElementById('addSpotifyButton')
    .addEventListener('click', addSpotifyWidget)
  document
    .getElementById('addNotionButton')
    .addEventListener('click', addNotionWidget)
  document
    .getElementById('addFormButton')
    .addEventListener('click', addGoogleFormWidget)
  document
    .getElementById('addMeetButton')
    .addEventListener('click', addGoogleMeetWidget)
  document
    .getElementById('addSheetButton')
    .addEventListener('click', addGoogleSpreadsheetWidget)
  document.getElementById('addQuote').addEventListener('click', addquote)
  document.getElementById('addChat').addEventListener('click', addchat)
  document
    .getElementById('IssueTracker')
    .addEventListener('click', addIssueTracker)
  document
    .getElementById('toggleChatButton')
    .addEventListener('click', toggleChat)

    // functions to add widgets

  function addIssueTracker() {
    const newWidget = document.createElement('div')
    newWidget.className = 'grid-stack-item'
    newWidget.setAttribute('gs-min-w', '4')
    newWidget.setAttribute('gs-min-h', '7')

    newWidget.innerHTML = `<div class="grid-stack-item-content">
                            <div class="google-slide-container">
                              <iframe src="widgets/issue_tracker/issue.html" name="targetframe" allowTransparency="true" scrolling="yes" frameborder="0" ></iframe>
                            </div>
                            <button class="remove-button">--------</button>
                          </div>`

    grid.addWidget(newWidget, { width: 4, height: 6 })

    initRemoveButton(newWidget)
  }

  function addquote() {
    const newWidget = document.createElement('div')
    newWidget.className = 'grid-stack-item'
    newWidget.setAttribute('gs-min-w', '4')
    newWidget.setAttribute('gs-min-h', '3')

    newWidget.innerHTML = `<div class="grid-stack-item-content">
                            <div class="google-slide-container">
                              <iframe src="widgets/quotes/quotes.html" name="targetframe" allowTransparency="true" scrolling="yes" frameborder="0" ></iframe>
                            </div>
                            <button class="remove-button">--------</button>
                          </div>`

    grid.addWidget(newWidget, { width: 4, height: 6 })

    initRemoveButton(newWidget)
  }

  function addGoogleMeetWidget() {
    const newWidget = document.createElement('div')
    newWidget.className = 'grid-stack-item'
    newWidget.setAttribute('gs-min-w', '4')
    newWidget.setAttribute('gs-min-h', '5')

    newWidget.innerHTML = `<div class="grid-stack-item-content">
                              <div class="google-slide-container">
                                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=UTC&bgcolor=%23ffffff&showTitle=0&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%230B8043" style="border:solid 1px #777" width="800" height="600" frameborder="0" scrolling="no"></iframe>
                              </div>
                              <button class="remove-button">--------</button>
                           </div>`
    grid.addWidget(newWidget, { width: 4, height: 5 })

    initRemoveButton(newWidget)
  }

  function addGoogleSpreadsheetWidget() {
    const newWidget = document.createElement('div')
    newWidget.className = 'grid-stack-item'
    newWidget.setAttribute('gs-min-w', '7')
    newWidget.setAttribute('gs-min-h', '7')

    newWidget.innerHTML = `<div class="grid-stack-item-content">
                            <div class="button-container" style="font-size: 18px; "> 
                              <a href="https://docs.google.com/spreadsheets/" target="blank" >
                              <button id="google-sheets" style="background-color: #6aa9e3;">
                                Go to Google Sheets
                              </button></a>
                            </div>
                            <div class="google-slide-container">
                              <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSU_h_OzbludaYgkgfPWkeVL7BqNL7ONTbL5Z8KJO43lj7UUKw-zh_8p-FZS7fyy2_P8T_UA-QOZmjm/pubhtml?widget=true&amp;headers=false"></iframe>
                            </div>
                            <button class="remove-button">--------</button>
                          </div>`
        
    grid.addWidget(newWidget, { width: 7, height: 7 })

    initRemoveButton(newWidget)
  }

  function addchat() {
    const newWidget = document.createElement('div')
    newWidget.className = 'grid-stack-item'
    newWidget.setAttribute('gs-min-w', '4')
    newWidget.setAttribute('gs-min-h', '6')

    newWidget.innerHTML = `<div class="grid-stack-item-content">
                            <div class="google-slide-container">
                              <iframe src="widgets/chatbot/chatbot.html" name="targetframe" allowTransparency="true" scrolling="yes" frameborder="0" ></iframe>
                            </div>
                            <button class="remove-button">--------</button>
                          </div>`

    grid.addWidget(newWidget, { width: 4, height: 6 })

    initRemoveButton(newWidget)
  }

  function addGoogleFormWidget() {
    const newWidget = document.createElement('div')
    newWidget.className = 'grid-stack-item'
    newWidget.setAttribute('gs-min-w', '5')
    newWidget.setAttribute('gs-min-h', '7')
    
    newWidget.innerHTML = `<div class="grid-stack-item-content">
                            <div class="button-container" style="font-size: 18px; "> 
                              <a href="https://docs.google.com/forms/" target="blank" >
                              <button id="google-form" style="background-color: #6aa9e3;">
                                Go to Google Forms
                              </button></a>
                            </div>
                            <div class="google-slide-container">
                              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf4Pwx9ucAIpBSNfwF7Q1eOB_2q5jdXXBxL8xBpdiT2YR9tjw/viewform?embedded=true" width="640" height="956" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                            </div>
                            <button class="remove-button">--------</button>
                           </div>`

    grid.addWidget(newWidget, { width: 5, height: 6 })

    initRemoveButton(newWidget)
  }

  function addPomodoroTimerWidget() {
    const newWidget = document.createElement('div')
    newWidget.className = 'grid-stack-item'
    newWidget.setAttribute('gs-min-w', '4')
    newWidget.setAttribute('gs-min-h', '6')

    newWidget.innerHTML = `<div class="grid-stack-item-content">
                            <div class="google-slide-container">
                              <iframe src="widgets/pomodoro/pomodoro-timer.html" name="targetframe" allowTransparency="true" scrolling="yes" frameborder="0" ></iframe>
                            </div>
                            <button class="remove-button">--------</button>
                          </div>`

    grid.addWidget(newWidget, { width: 4, height: 6 })

    initRemoveButton(newWidget)
  }

  function addGoogleSlideWidget() {
    const newWidget = document.createElement('div')
    newWidget.className = 'grid-stack-item'
    newWidget.setAttribute('gs-min-w', '4')
    newWidget.setAttribute('gs-min-h', '5')
    newWidget.innerHTML = `<div class="grid-stack-item-content">
                            <div class="google-slide-container">
                             <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSJ65jPtjjb_TpV4Xb_xVTRr_kc3tgwdVzXZ7u82d8vTThvZ9dDyjSjXvg-IXIGrND-MUYxiS0GGQFZ/embed?start=false&loop=true&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                            </div>
                            <button class="remove-button">--------</button>
                          </div>`

    grid.addWidget(newWidget, { width: 2, height: 2 })

    initRemoveButton(newWidget)
  }

  function addSpotifyWidget() {
    const newWidget = document.createElement('div')
    newWidget.className = 'grid-stack-item'
    newWidget.setAttribute('gs-min-w', '4')
    newWidget.setAttribute('gs-min-h', '3')
    newWidget.innerHTML = `<div class="grid-stack-item-content">
                            <div class="spotify-container">
                                <iframe src="https://open.spotify.com/embed/playlist/4kOdiP5gbzocwxQ8s2UTOF" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                            </div>
                            <button class="remove-button">--------</button>
                          </div>`

    grid.addWidget(newWidget, { width: 4, height: 3 })

    initRemoveButton(newWidget)
  }

  function addNotionWidget() {
    const newWidget = document.createElement('div')
    newWidget.className = 'grid-stack-item'
    newWidget.setAttribute('gs-min-w', '8')
    newWidget.setAttribute('gs-min-h', '6')

    newWidget.innerHTML = `<div class="grid-stack-item-content">
                            <div class="notion-container">
                               <iframe src="https://v2-embednotion.com/3f1ccbdd670547c3a4f537b5d1198bd9" style="width: 100%; height: 500px; border: 2px solid #ccc; border-radius: 10px; padding: none;"></iframe>"></iframe>
                            </div>
                            <button class="remove-button">--------</button>
                           </div>`

    grid.addWidget(newWidget, { width: 4, height: 3 })

    initRemoveButton(newWidget)
  }

  function initRemoveButton(container) {
    const removeButton = container.querySelector('.remove-button')
    removeButton.addEventListener('click', () => {
      grid.removeWidget(container)
    })
  }
})

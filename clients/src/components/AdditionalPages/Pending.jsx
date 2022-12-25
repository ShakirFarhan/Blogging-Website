import React from 'react'
import "./Error.css"
function Pending() {
  return (


    <section class="page_404">
      <div class="container ">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                {/* <h1 class="text-center error-text">Under Developement</h1> */}

              </div>

              <div class="contant_box_404">
                <h3 class="h2">
                  Coming Soon
                </h3>

                <p className='error-message'>This Page Is Under Developement</p>

                <a className='error-home' href="/" class="link_404">Homepage</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Pending
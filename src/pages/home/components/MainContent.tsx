import { data } from "@/utils/home.constants";
import React from "react";

function MainContent({
  title,
  content,
  // image,
}) {
  return (
    <div>
      <header>
        <h2 className="text-3xl capitalize mb-5">{title}</h2>
      </header>
      <main>
        <p className="capitalize">{content}</p>
        {/* <img
          src={"https://img.freepik.com/free-vector/cryptocurrency-bitcoin-golden-coin-background_1017-31505.jpg?w=2000&t=st=1688526634~exp=1688527234~hmac=efd38e6256d7f3db47b4a264f4bd1bbc2b266aa8d3e9282cf2d38ec5b4c9f1f6" ?? ''}
          alt="bitcoin"
          className="mt-5"
        /> */}
        {/* <p className="pt-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam quaerat
          labore, possimus quasi nemo deleniti laudantium culpa sit amet
          excepturi, doloribus, et dolorem. Reiciendis hic ratione quaerat
          commodi! Facere earum unde blanditiis quibusdam ad dicta magnam
          pariatur exercitationem, eveniet rem iure, omnis dolore, neque placeat
          sapiente vel quis ipsum non magni hic nam officiis quam inventore.
          Ratione corrupti sed expedita blanditiis quasi nemo optio distinctio
          harum repellendus, nam inventore temporibus cupiditate, facere eum
          quidem praesentium iste placeat quos cumque.
        </p> */}
      </main>
    </div>
  );
}

export default MainContent;

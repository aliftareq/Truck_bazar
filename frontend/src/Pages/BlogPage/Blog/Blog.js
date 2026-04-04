import React from "react";

const Blog = () => {
  return (
    <section className="bg-black text-gray-100 px-3 py-4 lg:p-10 rounded mx-3 my-4 lg:m-10">
      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
        <h2 className="mb-5 lg:mb-12 text-sm lg:text-4xl font-bold leading-none text-amber-300 text-center">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700">
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              How can I buy a truck from this platform?
            </summary>
            <div className="px-4 pb-4">
              <p>
                You can browse available trucks, filter based on your needs, and
                contact the seller directly through the platform. Once you find
                a suitable truck, you can negotiate and finalize the deal with
                the seller.
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              How do I list my truck for sale?
            </summary>
            <div className="px-4 pb-4">
              <p>
                To sell your truck, create an account, go to the "Add Listing"
                section, and provide details such as truck condition, price,
                images, and specifications. Once submitted, your listing will be
                visible to potential buyers.
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              Is there any verification for buyers and sellers?
            </summary>
            <div className="px-4 pb-4 space-y-2">
              <p>
                Yes, we encourage users to verify their profiles to build trust.
                Verified accounts help ensure safer transactions and reduce the
                risk of fraud.
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              What payment methods are supported?
            </summary>
            <div className="px-4 pb-4 space-y-2 overflow-x-auto">
              <p>
                Payment methods are handled directly between buyer and seller.
                Common options include bank transfer, cash payment, or other
                mutually agreed methods. Always ensure secure payment practices
                before completing a transaction.
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              How can I ensure the truck is in good condition?
            </summary>
            <div className="px-4 pb-4">
              <p>
                We recommend inspecting the truck in person or hiring a
                professional inspector before purchase. Always review documents,
                maintenance history, and verify ownership details.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default Blog;

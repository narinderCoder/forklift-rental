const NewForkliftsForSale = () => {
  const data = [
    {
      type: "Machine equipment",
      products: [
        {
          title: "Forklift 3000-6000lbs",
          image:
            "https://s3-alpha-sig.figma.com/img/6d93/53e3/d5dae077cc15b4ca0de40a607f175963?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gqk3IoDbJ32c~rGtllCEo3JCFgXvUdiisFAI7VKnepjPBFCQwUNB8CI-iD3vdSGxKk9XG5GF3wwx7dQZpeMymBDceMaoJDsEvaC08J-0lY4wqD1QIIIUBGGvs8ZuO1HcVJV81f23onnQ0-kmZi0P1AmmTJsH4wz2lzl4SdM~kmS3MjXpz7ufcy41p~rOtC1qOeoH7KbvF6JxkxRL-SDBaDT6MAmfE4Uz4asu0sgTyuPJJGsa1Olo0Cg9PYXwxfc8RChMq1CAN~0wTd8oGIO3tr-4w1WG2sZuaY7cpZo8CUwzFD3F7ABcnUWCoQpj-TYx8BM2sI7OtRmzYZ424ZUUBQ__",
        },
        {
          title: "Forklift 7000-10,000lbs",
          image:
            "https://s3-alpha-sig.figma.com/img/6d93/53e3/d5dae077cc15b4ca0de40a607f175963?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gqk3IoDbJ32c~rGtllCEo3JCFgXvUdiisFAI7VKnepjPBFCQwUNB8CI-iD3vdSGxKk9XG5GF3wwx7dQZpeMymBDceMaoJDsEvaC08J-0lY4wqD1QIIIUBGGvs8ZuO1HcVJV81f23onnQ0-kmZi0P1AmmTJsH4wz2lzl4SdM~kmS3MjXpz7ufcy41p~rOtC1qOeoH7KbvF6JxkxRL-SDBaDT6MAmfE4Uz4asu0sgTyuPJJGsa1Olo0Cg9PYXwxfc8RChMq1CAN~0wTd8oGIO3tr-4w1WG2sZuaY7cpZo8CUwzFD3F7ABcnUWCoQpj-TYx8BM2sI7OtRmzYZ424ZUUBQ__",
        },
        {
          title: "Forklift 10,000-35,000lbs",
          image:
            "https://s3-alpha-sig.figma.com/img/6d93/53e3/d5dae077cc15b4ca0de40a607f175963?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gqk3IoDbJ32c~rGtllCEo3JCFgXvUdiisFAI7VKnepjPBFCQwUNB8CI-iD3vdSGxKk9XG5GF3wwx7dQZpeMymBDceMaoJDsEvaC08J-0lY4wqD1QIIIUBGGvs8ZuO1HcVJV81f23onnQ0-kmZi0P1AmmTJsH4wz2lzl4SdM~kmS3MjXpz7ufcy41p~rOtC1qOeoH7KbvF6JxkxRL-SDBaDT6MAmfE4Uz4asu0sgTyuPJJGsa1Olo0Cg9PYXwxfc8RChMq1CAN~0wTd8oGIO3tr-4w1WG2sZuaY7cpZo8CUwzFD3F7ABcnUWCoQpj-TYx8BM2sI7OtRmzYZ424ZUUBQ__",
        },
      ],
    },
    {
      type: "Electrical equipment",
      products: [
        {
          title: "Electric Walkie Stacker",
          image:
            "https://s3-alpha-sig.figma.com/img/6d93/53e3/d5dae077cc15b4ca0de40a607f175963?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gqk3IoDbJ32c~rGtllCEo3JCFgXvUdiisFAI7VKnepjPBFCQwUNB8CI-iD3vdSGxKk9XG5GF3wwx7dQZpeMymBDceMaoJDsEvaC08J-0lY4wqD1QIIIUBGGvs8ZuO1HcVJV81f23onnQ0-kmZi0P1AmmTJsH4wz2lzl4SdM~kmS3MjXpz7ufcy41p~rOtC1qOeoH7KbvF6JxkxRL-SDBaDT6MAmfE4Uz4asu0sgTyuPJJGsa1Olo0Cg9PYXwxfc8RChMq1CAN~0wTd8oGIO3tr-4w1WG2sZuaY7cpZo8CUwzFD3F7ABcnUWCoQpj-TYx8BM2sI7OtRmzYZ424ZUUBQ__",
        },
        {
          title: "Electric Pallet Jacks",
          image:
            "https://s3-alpha-sig.figma.com/img/6d93/53e3/d5dae077cc15b4ca0de40a607f175963?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gqk3IoDbJ32c~rGtllCEo3JCFgXvUdiisFAI7VKnepjPBFCQwUNB8CI-iD3vdSGxKk9XG5GF3wwx7dQZpeMymBDceMaoJDsEvaC08J-0lY4wqD1QIIIUBGGvs8ZuO1HcVJV81f23onnQ0-kmZi0P1AmmTJsH4wz2lzl4SdM~kmS3MjXpz7ufcy41p~rOtC1qOeoH7KbvF6JxkxRL-SDBaDT6MAmfE4Uz4asu0sgTyuPJJGsa1Olo0Cg9PYXwxfc8RChMq1CAN~0wTd8oGIO3tr-4w1WG2sZuaY7cpZo8CUwzFD3F7ABcnUWCoQpj-TYx8BM2sI7OtRmzYZ424ZUUBQ__",
        },
        {
          title: "Electric Forklifts",
          image:
            "https://s3-alpha-sig.figma.com/img/6d93/53e3/d5dae077cc15b4ca0de40a607f175963?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gqk3IoDbJ32c~rGtllCEo3JCFgXvUdiisFAI7VKnepjPBFCQwUNB8CI-iD3vdSGxKk9XG5GF3wwx7dQZpeMymBDceMaoJDsEvaC08J-0lY4wqD1QIIIUBGGvs8ZuO1HcVJV81f23onnQ0-kmZi0P1AmmTJsH4wz2lzl4SdM~kmS3MjXpz7ufcy41p~rOtC1qOeoH7KbvF6JxkxRL-SDBaDT6MAmfE4Uz4asu0sgTyuPJJGsa1Olo0Cg9PYXwxfc8RChMq1CAN~0wTd8oGIO3tr-4w1WG2sZuaY7cpZo8CUwzFD3F7ABcnUWCoQpj-TYx8BM2sI7OtRmzYZ424ZUUBQ__",
        },
      ],
    },
  ];
  return (
    <div className="container section-alt">
      <h1 className="h1 mb-4">New Forklifts For Sale</h1>
      <p className="p1 text-secondary" style={{ marginBottom: "5rem" }}>
        {`Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.`}
      </p>
      <div className="d-flex flex-column" style={{ gap: "7.5rem" }}>
        {data.map((item, index) => (
          <div key={index}>
            <div
              className="d-flex flex-column w-100 h-100"
              style={{ gap: "3.75rem" }}
            >
              <h4 className="h4 text-center">{item.type}</h4>
              <div className="row g-4">
                {item.products.map((product, ind) => (
                  <div key={ind} className="col-md-4 col-12">
                    <div className="border d-flex flex-column align-items-center gap-2 rounded-4 p-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="p-2 w-100"
                      />
                      <p className="p1 text-center">{product.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewForkliftsForSale;

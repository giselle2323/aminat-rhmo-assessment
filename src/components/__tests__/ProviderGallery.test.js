/**

@jest-environment jsdom
*/
import React from "react";
import Gallery from "../ProviderGallery";
import { render } from "@testing-library/react";

let data = [
  {
    id: 1,
    name: "Aminat",
    description: "A developer",
    imageUrl:
      "https://i.insider.com/5ae75d4ebd967122008b4623?width=1100&format=jpeg&auto=webp",
  },
  {
    id: 2,
    name: "Jumoke",
    description: "A gamer",
    imageUrl:
      "https://i.insider.com/5ae75d4ebd967122008b4623?width=1100&format=jpeg&auto=webp",
  },
];

describe("Gallery", () => {
  test("should display providers", async () => {
  
    const { findByText } = render(<Gallery items={data} />);
    const el = await findByText(data[0].description);
    expect(el).toBeInTheDocument();
  });
});
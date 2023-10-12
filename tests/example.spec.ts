import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://cloudtesting.contosotraders.com/");

  const locator = page.locator(".message.m-0");
  await expect(locator).toHaveText(
    "This Is A Demo Store For Testing Purposes — No Orders Shall Be Fulfilled.",
  );
});

test("go to controllers page and check controller exists", async ({ page }) => {
  await page.goto("https://cloudtesting.contosotraders.com/");
  page.getByRole("link", { name: "Controllers" }).first().click();
  await page.waitForURL(
    "https://cloudtesting.contosotraders.com/list/controllers",
  );
  // check product title appears
  const productTitle = page.getByRole("heading", {
    name: "Xbox Wireless Controller Aqua Shift Special Edition",
  });
  await expect(productTitle).toHaveText(
    "Xbox Wireless Controller Aqua Shift Special Edition",
  );
  // Check price text appears

  await expect(
    page
      .getByTitle("Xbox Wireless Controller Aqua Shift Special Edition")
      .locator(".MuiCardContent-root.css-1qw96cp .productOrgPrice"),
  ).toHaveText("$254.00");
  // const productPrice = page.locator(
  //   "MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.productCard.css-s18byi",
  // );
  // await expect(productPrice).toHaveText("$254.00");

  // checking add to basket button is visible

  // const addToBasketBtn = page.getByRole("button", { name: "add to bag" });
  // await expect(addToBasketBtn).toBeVisible();

  // clicking the description tab

  const description = page.locator(
    "MuiTypography-root.MuiTypography-body1.css-9l3uo3",
  );
  await description.click();

  const descriptionTxt = page.locator(
    "MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered css-c4sutr",
  );

  await expect(descriptionTxt).toHaveText("Model Number: Xbox Series X");
});

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" }),
//   ).toBeVisible();
// });

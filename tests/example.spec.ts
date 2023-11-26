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
    page.getByRole("heading", { name: "$254.00" }).nth(1),
  ).toHaveText("$254.00");

  page
    .getByTitle("Xbox Wireless Controller Aqua Shift Special Edition")
    .click();
  await page.waitForURL(
    "https://cloudtesting.contosotraders.com/product/detail/30",
  );

  // checking add to basket button is visible

  const addToBasketBtn = page.getByRole("button", { name: "add to bag" });
  await expect(addToBasketBtn).toBeVisible();

  const controllerTitle = page.locator(".productdetailName");
  await expect(controllerTitle).toHaveText(
    "Xbox Wireless Controller Aqua Shift Special Edition",
  );

  const controllerPrice = page.locator(".newprice");
  await expect(controllerPrice).toHaveText("$254.00");
  page.getByRole("button", { name: "Description" }).click();
  const descriptionBox = page.getByText("Model Number: Xbox Series X");
  await expect(descriptionBox).toBeVisible();

  page.getByRole("button", { name: "+" }).click();
  const quantity = page.locator(".quantity-display");
  await expect(quantity).toHaveValue("2");

  page.locator(".CartButton").click();

  const checkOutPopUp = page.locator(".MuiAlert-message");
  await expect(checkOutPopUp).toHaveText(
    "Added Xbox Wireless Controller Aqua Shift Special Edition to Cart",
  );
  await page.waitForTimeout(2000);
  await expect(checkOutPopUp).toBeHidden();

  const cartIcon = page.getByLabel("cart");
  await expect(cartIcon).toHaveText("1");
  await cartIcon.click();
  await expect(page).toHaveURL("https://cloudtesting.contosotraders.com/cart");
  const checkOutText = page.getByText(
    "Xbox Wireless Controller Aqua Shift Special Edition",
  );
  await expect(checkOutText).toBeVisible();

  const discountText = page.getByTestId("discount");
  await expect(discountText).toBeVisible();

  const discountBtn = page.getByTestId("CancelIcon");
  await expect(discountBtn).toBeVisible();
  await discountBtn.click();

  const cartDiscountTxt = page.getByTestId("discount");
  await expect(cartDiscountTxt).toHaveText("-$0.00");

  const newPrc = page.locator(".OrderTotalPrice");
  await expect(newPrc).toHaveText("$608.00");
});

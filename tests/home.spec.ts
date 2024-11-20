import { test, expect } from "@playwright/test";

const WALLET_ADDRESS =
  process.env.ETH_ADDRESS ?? "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

test("it should redirect to 404 page if the URL does not exist", async ({
  page,
}) => {
  await page.goto("/anything");

  await expect(page.getByTestId("404_not_found")).toBeVisible();
});

test("it should display the balance of the wallet, if the address is valid", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Tatum Hello" }),
  ).toBeVisible();

  await expect(page.getByTestId("address_input")).toBeEmpty();

  await expect(page.getByTestId("error_message")).toBeHidden();

  await expect(page.getByTestId("balance_value")).toBeHidden();

  await page.getByTestId("address_input").fill(WALLET_ADDRESS);

  expect(await page.getByTestId("address_input").inputValue()).toEqual(
    WALLET_ADDRESS,
  );

  await page.getByTestId("submit_address").click();

  await expect(page.getByTestId("balance_value")).toBeVisible({
    timeout: 10000,
  });
});

test("it should display an error message, if the address is invalid", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Tatum Hello" }),
  ).toBeVisible();

  await expect(page.getByTestId("address_input")).toBeEmpty();

  await expect(page.getByTestId("error_message")).toBeHidden();

  await expect(page.getByTestId("balance_value")).toBeHidden();

  const invalidAddress = "0x8C8D7C46219D9205f056f28fee5950aD5";

  await page.getByTestId("address_input").fill(invalidAddress);

  expect(await page.getByTestId("address_input").inputValue()).toEqual(
    invalidAddress,
  );

  await page.getByTestId("submit_address").click();

  await expect(page.getByTestId("error_message")).toBeVisible({
    timeout: 10000,
  });

  await expect(page.getByTestId("balance_value")).toBeHidden();
});

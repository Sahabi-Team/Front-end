
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResetPassword from "../src/pages/ChangePasswordClient.jsx"; 
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../src/contexts/AuthContext.jsx";


vi.mock("../src/services/ClientProfileApi.jsx", () => ({
  profileAPI: {
    changePassword: vi.fn(),
  },
}));


vi.mock("../src/components/ClientSidebar.jsx", () => ({
  default: () => <div data-testid="sidebar" />,
}));
vi.mock("../src/components/Header.jsx", () => ({
  default: () => <div data-testid="header" />,
}));
vi.mock("../src/components/modals/ErrorModal.jsx", () => ({
  default: ({ open, errorMessage }) =>
    open ? <div>{errorMessage}</div> : null,
}));
vi.mock("../src/components/modals/SuccessfulModal.jsx", () => ({
  default: ({ open, successMessage }) =>
    open ? <div>{successMessage}</div> : null,
}));

const renderWithProviders = (ui, { userInfo = { usertype: "trainee" } } = {}) => {
  return render(
    <AuthContext.Provider value={{ userInfo }}>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>
  );
};

describe("ResetPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the reset password form", () => {
    renderWithProviders(<ResetPassword />);
    expect(screen.getByPlaceholderText("رمز عبور جدید")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("تکرار رمز عبور جدید")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ذخیره/i })).toBeInTheDocument();
  });

  it("shows validation error if password is too short", async () => {
    renderWithProviders(<ResetPassword />);
    const passwordInput = screen.getByPlaceholderText("رمز عبور جدید");
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: /ذخیره/i }));

    await screen.findByText("رمز عبور نباید کمتر از ۸ کاراکتر باشد.");
  });

  it("shows validation error if confirm password doesn't match", async () => {
    renderWithProviders(<ResetPassword />);
    fireEvent.change(screen.getByPlaceholderText("رمز عبور جدید"), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByPlaceholderText("تکرار رمز عبور جدید"), {
      target: { value: "87654321" },
    });
    fireEvent.click(screen.getByRole("button", { name: /ذخیره/i }));

    await screen.findByText("با رمز عبور جدید مطابقت ندارد.");
  });

  it("calls changePassword and shows success modal on valid submission", async () => {
    const { profileAPI } = await import("../src/services/ClientProfileApi.jsx");
    profileAPI.changePassword.mockResolvedValueOnce({});

    renderWithProviders(<ResetPassword />);
    fireEvent.change(screen.getByPlaceholderText("رمز عبور جدید"), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByPlaceholderText("تکرار رمز عبور جدید"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ذخیره/i }));

    await waitFor(() =>
      expect(
        screen.getByText("رمز عبور با موفقیت تغییر یافت.")
      ).toBeInTheDocument()
    );

    expect(profileAPI.changePassword).toHaveBeenCalledWith({
      new_password: "12345678",
      confirm_password: "12345678",
    });
  });

  it("shows error modal on failed API call", async () => {
    const { profileAPI } = await import("../src/services/ClientProfileApi.jsx");
    profileAPI.changePassword.mockRejectedValueOnce({
      response: {
        data: {
          detail: "رمز قبلی اشتباه است.",
        },
      },
    });

    renderWithProviders(<ResetPassword />);
    fireEvent.change(screen.getByPlaceholderText("رمز عبور جدید"), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByPlaceholderText("تکرار رمز عبور جدید"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ذخیره/i }));

    await screen.findByText("رمز قبلی اشتباه است.");
  });
});

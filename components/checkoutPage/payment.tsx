/* eslint-disable @next/next/no-img-element */
import { Stack } from "@mui/material";
import CustomDivider from "../shared/customDivider";
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";

const Payment = () => {
    const FUNDING_SOURCES = [FUNDING.PAYPAL, FUNDING.CARD];

    return (
        <Stack
            width="100%"
            alignItems="center"
            justifyContent="center"
            pt={10}
            pb={5}
        >
            <CustomDivider />

            {/* <form
                action="https://www.sandbox.paypal.com/cgi-bin/webscr"
                method="post"
                target="_top"
            >
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input
                    type="hidden"
                    name="hosted_button_id"
                    value="NSHZN9PKUEFLN"
                />
                <input
                    type="image"
                    src="https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif"
                    name="submit"
                    alt="PayPal - The safer, easier way to pay online!"
                />
                <img
                    alt=""
                    src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif"
                    width="1"
                    height="1"
                />
            </form> */}

            <Stack>
                {FUNDING_SOURCES.map((fundingSource) => {
                    return (
                        <PayPalButtons
                            fundingSource={fundingSource}
                            key={fundingSource}
                            style={{
                                layout: "vertical",
                                shape: "rect",
                            }}
                            createOrder={async (data, actions) => {
                                try {
                                    const response = await fetch(
                                        "/api/paypal/createPaypalOrder",
                                        {
                                            method: "POST",
                                        }
                                    );

                                    const details = await response.json();
                                    return details.id;
                                } catch (error) {
                                    console.error(error);
                                    // Handle the error or display an appropriate error message to the user
                                }
                            }}
                            onApprove={async (data, actions) => {
                                try {
                                    const response = await fetch(
                                        `/api/paypal/createPaypalOrder/${data.orderID}`,
                                        {
                                            method: "POST",
                                        }
                                    );

                                    const details = await response.json();
                                    // Three cases to handle:
                                    //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                    //   (2) Other non-recoverable errors -> Show a failure message
                                    //   (3) Successful transaction -> Show confirmation or thank you message

                                    // This example reads a v2/checkout/orders capture response, propagated from the server
                                    // You could use a different API or structure for your 'orderData'
                                    const errorDetail =
                                        Array.isArray(details.details) &&
                                        details.details[0];

                                    if (
                                        errorDetail &&
                                        errorDetail.issue ===
                                            "INSTRUMENT_DECLINED"
                                    ) {
                                        return actions.restart();
                                        // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
                                    }

                                    if (errorDetail) {
                                        let msg =
                                            "Sorry, your transaction could not be processed.";
                                        msg += errorDetail.description
                                            ? " " + errorDetail.description
                                            : "";
                                        msg += details.debug_id
                                            ? " (" + details.debug_id + ")"
                                            : "";
                                        alert(msg);
                                    }

                                    // Successful capture! For demo purposes:
                                    console.log(
                                        "Capture result",
                                        details,
                                        JSON.stringify(details, null, 2)
                                    );
                                    const transaction =
                                        details.purchase_units[0].payments
                                            .captures[0];
                                    alert(
                                        "Transaction " +
                                            transaction.status +
                                            ": " +
                                            transaction.id +
                                            "See console for all available details"
                                    );
                                } catch (error) {
                                    console.error(error);
                                    // Handle the error or display an appropriate error message to the user
                                }
                            }}
                        />
                    );
                })}
            </Stack>
        </Stack>
    );
};

export default Payment;

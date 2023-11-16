import { PayPalButtonsComponent, loadScript } from "@paypal/paypal-js";
import { paypal_api } from "../../url";
import countOfRepeats from "../../../helpers/countOfRepeats";
import getRepeatItemsPaypal from "../../../helpers/getRepeatItemsPaypal";

let paypalButtonInstance: PayPalButtonsComponent | undefined;

export const callPaypalApi = async (container: HTMLElement) => {
    try {
        const response = await loadScript({ clientId: `${paypal_api}&locale=es_ES` })
        if (!(window.paypal
            && window.paypal.Buttons
            && container
            && response)) return;
        updatePaypalAmount('1', [], container);
    } catch (error) {
        console.error('Error al cargar el script de PayPal:', error);
    };
};

export const updatePaypalAmount = (totalPrice: string, products: Product[], container:HTMLElement) => {
    const arrayItemsFromProducts = products
        .map<ItemProductToSendPaypal>(product => {
            const quantity = String(countOfRepeats(product.id, products).count)
            return {
                name: product.title,
                description: product.description,
                unit_amount: {
                    value: String(product.price.toFixed(2)),
                    currency_code: 'USD'
                },
                quantity: quantity == '0' ? '1' : quantity
            }
        }) || [];

    const filterItemsProducts = getRepeatItemsPaypal(arrayItemsFromProducts);

    const itemTotal = filterItemsProducts.reduce((acc, item) => {
        return acc + Number(item.unit_amount.value) * Number(item.quantity);
    }, 0);

    const purchase_units = [{
        amount: {
            value: totalPrice,
            breakdown: {
                item_total: {
                    value: String(itemTotal.toFixed(2)),
                    currency_code: 'USD'
                }
            },
        },
        items: filterItemsProducts
    }];

    if (!(window.paypal
        && window.paypal.Buttons
        && container)) return;

    if (paypalButtonInstance) {
        paypalButtonInstance.close();
    }
    paypalButtonInstance = window.paypal.Buttons({
        style: {
            color: 'blue',
        },
        createOrder: (_data, actions) => {
            return actions.order.create({
                purchase_units
            });
        }
    });
    paypalButtonInstance.render(container);
};
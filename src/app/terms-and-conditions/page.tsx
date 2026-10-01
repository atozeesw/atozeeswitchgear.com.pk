// src/app/terms-and-conditions/page.tsx
'use client';

import React from 'react';
import { DM_Sans } from 'next/font/google';

import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

type Term = {
  id: number;
  title: string;
  content: React.ReactNode;
};

const terms: Term[] = [
  {
    id: 1,
    title: 'Price',
    content: (
      <>
        <p>
          Quoted Prices are <strong>Ex works, Karachi</strong>.
        </p>
        <p className="mt-3">
          The prices are to be understood for the entire scope offered by us. We
          reserve the right to change our prices in case of change in technical
          arrangements. Tests at site are not included in our offer. All costs
          for client or third-party inspections including air fare, hotel
          accommodation, living expenses etc. have to be borne by the
          purchaser. Please note that offered prices are valid for the above
          project only for the quoted validity.
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: 'Terms of Payment',
    content: (
      <p>
        <strong>75%</strong> of the total contract price as Advance within 1
        week of issue of LOI/PO, Balance <strong>25%</strong> before delivery.
        Performa Invoice against readiness of Switchboards.
      </p>
    ),
  },
  {
    id: 3,
    title: 'Delivery Time',
    content: (
      <>
        <p>
          Delivery on Ex works basis can be made within{' '}
          <strong>01 working weeks</strong> after receipt of uninterrupted
          manufacturing clearance along with approved drawings. The above
          delivery time is given in good faith, based on present indications of
          workshop loading and must be confirmed when placing an order.
        </p>
        <p className="mt-3 font-semibold text-black">
          The delivery time is based on:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>
            A technically and commercially clear order, within the validity
            period of this quotation comprising full and final information
            allowing us to start and proceed uninterrupted with design and
            production.
          </li>
        </ul>
        <p className="mt-3">
          In case any of the above is delayed beyond the date agreed upon in the
          contract, we reserve the right for a corresponding delay in delivery
          and adjustment of the price if necessary. The present rate is{' '}
          <strong>0.5% price increase per month postponement</strong>.
        </p>
      </>
    ),
  },
  {
    id: 4,
    title: 'Packing & Forwarding',
    content: (
      <p>
        Material will be supplied in suitable packing. Stretched Polythene &
        cardboard packing will be provided <strong>FOC</strong>. In case of
        wooden packing, Crate packing OR Sea worthy packing requirement, need
        to be specified and shall be charged extra unless specified and
        confirmed from our side.
      </p>
    ),
  },
  {
    id: 5,
    title: 'Freight',
    content: (
      <p>
        Above quoted prices are <strong>Ex-works prices</strong>. Applicable
        freight up to the required site / destination will be extra.
      </p>
    ),
  },
  {
    id: 6,
    title: 'Warranty',
    content: (
      <>
        <p>
          We stand guarantee for the equipment supplied by us against bad
          material, faulty design and poor workmanship for a period of{' '}
          <strong>12 months</strong> from the date of commissioning or{' '}
          <strong>18 months</strong> from the date of Ex-works delivery
          whichever is earlier. Our warranty/guarantee excludes collateral and
          consequential damages. The above warranty subject to purchaser&apos;s
          compliance with applicable warranty conditions as provided by
          Supplier. Parts and components, which are repaired or replaced during
          such period, are warranted for the original warranty period.
        </p>
        <p className="mt-3 font-semibold text-black">
          This warranty shall not apply to defects resulting from:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>Willful damage / negligence.</li>
          <li>Normal wear and tear.</li>
          <li>
            Wrong installation and/or maintenance by Purchaser or a third party.
          </li>
          <li>Misuse or abuse of Equipment.</li>
          <li>
            Modifications or alterations made by Purchaser or a third party
            without supplier&apos;s written consent.
          </li>
          <li>
            Failure of Purchaser to maintain environmental conditions in
            accordance with Supplier&apos;s instructions, including, but not
            limited to, adequate electrical power, temperature and humidity
            control.
          </li>
          <li>
            Customized Equipment manufactured by third parties for incorporation
            into Equipment and for resale to Purchaser except that Purchaser
            shall be entitled to the benefit of any warranty or guarantee given
            by such third party manufacturers, and Causes beyond supplier&apos;s
            reasonable control.
          </li>
          <li>
            Any activity during Erection &amp; commissioning without the notice
            / presence / written consent of A to Zee Service personnel.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 7,
    title: 'Consequential Losses',
    content: (
      <p>
        Neither party shall be liable for any loss, damage, failure or delay in
        performing its obligations under the contract to the extent directly or
        indirectly caused by or arising from an event of{' '}
        <strong>Force Majeure</strong>, which shall include but not be limited
        to acts of God, acts of governmental authorities, earthquakes, strikes,
        war, flood, epidemics, civil unrest, riots or other causes beyond its
        reasonable control. The timelines shall be extended for a period equal
        to the time lost by reason of delay plus such additional time as may be
        reasonably necessary to overcome the effect of the delay.
      </p>
    ),
  },
  {
    id: 8,
    title: 'Limitation of Liability',
    content: (
      <p>
        Notwithstanding anything contained herein, A to Zee&apos;s maximum
        aggregate limit of liability whether under and/or in connection with
        this contract or the performance or non-performance thereof or as a
        result of any fundamental breach of contract, warranty including
        termination of this contract by the customer shall not exceed the total
        contract value or payments received under the purchase order, whichever
        is lower.
      </p>
    ),
  },
  {
    id: 9,
    title: 'Exclusion of Indirect / Consequential Losses',
    content: (
      <p>
        Notwithstanding any other provision of the contract, neither party
        shall, under any circumstances be liable to the other for loss of
        profits, loss of use, loss of opportunity or any consequential or
        indirect or economic losses.
      </p>
    ),
  },
  {
    id: 10,
    title: 'Dispute Resolution',
    content: (
      <p>
        This contract shall be governed by the laws of{' '}
        <strong>Pakistan</strong>. Any dispute arising out of or in connection
        with the contract, which cannot be amicably settled between the parties
        within a period of 15 days from the date of its initiation, shall be
        referred to and finally resolved by arbitration to be conducted in
        accordance with the{' '}
        <strong>Arbitration and Conciliation Act, 1940</strong>.
      </p>
    ),
  },
  {
    id: 11,
    title: 'Order Cancellation Charges',
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          After drawings submission — <strong>15%</strong> of Contract Price.
        </li>
        <li>
          After ordering of major material — <strong>65%</strong> of Contract
          Price.
        </li>
        <li>
          After start of assembly — <strong>90%</strong> of Contract Price.
        </li>
        <li>
          After completion of assembly — <strong>100%</strong> of Contract
          Price.
        </li>
      </ul>
    ),
  },
  {
    id: 12,
    title: 'Temporary Storage & Insurance for Failure to Take Delivery',
    content: (
      <p>
        Once ready for dispatch advice has been issued to you, but you are not
        able to receive the goods at the agreed delivery time, you will be
        charged for storage cost. The storage charges shall be{' '}
        <strong>2% of contract Value per Month</strong>, not inclusive of
        insurance which you will be separately charged. All storage and
        insurance charges will need to be fully settled prior to delivery.
      </p>
    ),
  },
  {
    id: 13,
    title: 'Customer Changes During Assembly / FAT / After FAT',
    content: (
      <p>
        These changes shall be consolidated and executed at site against a
        separate service order.
      </p>
    ),
  },
  {
    id: 14,
    title: 'Validity',
    content: (
      <p>
        Offer shall be valid for <strong>15 days</strong> from the date of
        submission of tender.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <Navbar />

      <section className={`bg-white py-12 md:py-16 ${dmsans.className}`}>
        <div className="w-full px-6 sm:px-8 md:px-12">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-gray-600 mb-10 leading-relaxed">
            Please read our terms and conditions carefully before placing an
            order. These apply to all quotations and contracts issued by A to
            Zee Switchgear Engineering.
          </p>

          {/* Terms — plain text, no borders */}
          <div className="space-y-8">
            {terms.map((term) => (
              <div key={term.id}>
                <h2 className="text-base sm:text-lg font-bold text-black mb-2">
                  {term.id}. {term.title}
                </h2>
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-1">
                  {term.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function ContactQR() {
  return (
    <div className="mt-6">
      <p className="text-gray-300 mb-2">Scan to call or save:</p>
      <div className="inline-block bg-white p-3 rounded-lg shadow">
        <QRCodeCanvas value="tel:+385958887449" size={160} />
      </div>
    </div>
  );
}

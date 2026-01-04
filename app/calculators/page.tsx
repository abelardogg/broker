'use client'

import { useState, useMemo } from 'react'
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react'
import { formatCurrency, calculateMonthlyPayment } from '@/lib/utils'

export default function CalculatorsPage() {
  const [loanAmount, setLoanAmount] = useState(400000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [downPayment, setDownPayment] = useState(80000)
  const [propertyTax, setPropertyTax] = useState(4800)
  const [insurance, setInsurance] = useState(1200)

  const calculations = useMemo(() => {
    const principal = loanAmount - downPayment
    const monthlyPI = calculateMonthlyPayment(principal, interestRate, loanTerm)
    const monthlyTax = propertyTax / 12
    const monthlyInsurance = insurance / 12
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance
    const totalPayments = monthlyPI * loanTerm * 12
    const totalInterest = totalPayments - principal

    return {
      principal,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      totalMonthly,
      totalInterest,
      downPaymentPercent: ((downPayment / loanAmount) * 100).toFixed(1),
    }
  }, [loanAmount, interestRate, loanTerm, downPayment, propertyTax, insurance])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-20">
        <div className="container-wide">
          <h1 className="text-display-sm md:text-display-md mb-6">Mortgage Calculator</h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Estimate your monthly mortgage payment and see how different factors affect your costs.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Inputs */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-8">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-8">
                Loan Details
              </h2>

              <div className="space-y-8">
                {/* Home Price */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-neutral-700">Home Price</label>
                    <span className="text-sm font-semibold text-brand-600">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={2000000}
                    step={10000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>$100K</span>
                    <span>$2M</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-neutral-700">Down Payment</label>
                    <span className="text-sm font-semibold text-brand-600">
                      {formatCurrency(downPayment)} ({calculations.downPaymentPercent}%)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={loanAmount * 0.5}
                    step={5000}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>$0</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-neutral-700">Interest Rate</label>
                    <span className="text-sm font-semibold text-brand-600">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    step={0.125}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                  <div className="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>2%</span>
                    <span>12%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-3 block">
                    Loan Term
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[15, 20, 30].map((term) => (
                      <button
                        key={term}
                        onClick={() => setLoanTerm(term)}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                          loanTerm === term
                            ? 'bg-brand-600 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {term} years
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Tax */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Annual Property Tax
                    </label>
                    <span className="text-sm font-semibold text-brand-600">
                      {formatCurrency(propertyTax)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={20000}
                    step={100}
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                </div>

                {/* Insurance */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Annual Insurance
                    </label>
                    <span className="text-sm font-semibold text-brand-600">
                      {formatCurrency(insurance)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5000}
                    step={100}
                    value={insurance}
                    onChange={(e) => setInsurance(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="bg-brand-600 rounded-2xl p-8 text-white mb-6">
                <div className="text-white/70 mb-2">Estimated Monthly Payment</div>
                <div className="text-5xl font-bold mb-6">
                  {formatCurrency(calculations.totalMonthly)}
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Principal & Interest</span>
                    <span>{formatCurrency(calculations.monthlyPI)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Property Tax</span>
                    <span>{formatCurrency(calculations.monthlyTax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Home Insurance</span>
                    <span>{formatCurrency(calculations.monthlyInsurance)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200 p-8">
                <h3 className="text-lg font-semibold text-neutral-900 mb-6">Loan Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-neutral-100">
                    <span className="text-neutral-600">Loan Amount</span>
                    <span className="font-semibold">{formatCurrency(calculations.principal)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-neutral-100">
                    <span className="text-neutral-600">Down Payment</span>
                    <span className="font-semibold">{formatCurrency(downPayment)}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-neutral-100">
                    <span className="text-neutral-600">Total Interest Paid</span>
                    <span className="font-semibold">{formatCurrency(calculations.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-neutral-600">Loan Term</span>
                    <span className="font-semibold">{loanTerm} years</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-neutral-500 mt-6">
                * This calculator provides estimates for informational purposes only. 
                Actual rates and payments may vary. Contact us for a personalized quote.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

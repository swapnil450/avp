import React from 'react'

export default function DoctorDetails() {
  return (
    <>
    
    <table class="border border-1 border-black text-center">
          <thead>
            <tr>
              <th class="border border-black text-center text-sm font-bold text-gray-800 p-1">
                SR.NO
              </th>
              <th class="border border-black text-center text-sm font-bold text-gray-800 p-1">
                Code NO
              </th>
              <th class="border border-black text-center text-sm font-bold text-gray-800 p-1">
                Doctor Name
              </th>
              <th class="border border-black text-center text-sm font-bold text-gray-800 p-1">
                Qualification
              </th>
              <th class="border border-black text-center text-sm font-bold text-gray-800 p-1">
                Speciality
              </th>
              <th
                colspan="2"
                class="border border-black text-center text-sm font-bold text-gray-800 p-1"
              >
                Targeted Product
              </th>
              <th
                colspan="2"
                class="border border-black text-center text-sm font-bold text-gray-800 p-1"
              >
                Sample Given
              </th>
              <th
                colspan="1"
                class="border border-black text-center text-sm font-bold text-gray-800 p-1"
              >
                Lit-Y/N
              </th>
              <th
                colspan="2"
                class="border border-black text-center text-sm font-bold text-gray-800 p-1"
              >
                Other.i.
              </th>
              <th class="border border-black text-center text-sm font-bold text-gray-800 p-1">
                Doctor Specify Commitment in Word
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td class="border border-black p-1 text-sm">1</td>
              <td class="border border-black p-1 text-sm">aljshjb</td>
              <td class="border border-black p-1 text-sm">
                chaitanya sanjay chaudhari
              </td>
              <td class="border border-black p-1 text-sm">mbbs</td>
              <td class="border border-black p-1 text-sm">brain</td>
              <td class="border border-black p-1 text-sm">Product 1</td>
              <td class="border border-black p-1 text-sm">Product 2</td>
              <td class="border border-black p-1 text-sm">Sample 1</td>
              <td class="border border-black p-1 text-sm">Sample 2</td>
              <td class="border border-black p-1 text-sm">Yes</td>
              <td class="border border-black p-1 text-sm">-</td>
              <td class="border border-black p-1 text-sm">-</td>
              <td class="border text-center border-black p-1 text-sm">-</td>
            </tr>
          </tbody>
        </table>
    </>
  )
}

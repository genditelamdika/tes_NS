// import React from 'react';
import React, { useState } from 'react';

const Output = ({ data, showOutput }) => {
  const output = {};

  data.forEach((grade) => {
    const { student, aspects } = grade;

    Object.entries(aspects).forEach(([aspect, value]) => {
      if (!output[aspect]) {
        output[aspect] = {};
      }
      output[aspect][student.toLowerCase()] = value || '';
    });
  });

  if (!showOutput) {
    return null;
  }

  return (
    <div>
      <h2>Output JSON</h2>
      <pre>{JSON.stringify(output, null, 2)}</pre>
    </div>
  );
};

const App = () => {
  const students = ['Siswa_1', 'Siswa_2', 'Siswa_3', 'Siswa_4', 'Siswa_5', 'Siswa_6', 'Siswa_7', 'Siswa_8','Siswa_9', 'Siswa_10',  ];
  const aspects = ['Aspek 1', 'Aspek 2', 'Aspek 3', 'Aspek 4'];
  const [grades, setGrades] = useState(
    students.map((student) => ({ student: student, aspects: {} }))
  );
  const [showOutput, setShowOutput] = useState(false);

  const handleGradeChange = (index, aspect, value) => {
    setGrades((prevGrades) => {
      const updatedGrades = [...prevGrades];
      updatedGrades[index].aspects[aspect] = value;
      return updatedGrades;
    });
  };

  const handleSave = () => {
    setShowOutput(true);
  };

  return (
    <div >
      <h1>Penilaian Mahasiswa</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Mahasiswa</th>
            {aspects.map((aspect, index) => (
              <th key={index}>{aspect}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{grade.student}</td>
              {aspects.map((aspect, aspectIndex) => (
                <td key={aspectIndex}>
                  <select
                    value={grade.aspects[aspect] || ''}
                    onChange={(e) =>
                      handleGradeChange(index, aspect, e.target.value)
                    }
                  >
                    <option value="">Pilih Nilai</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Submit</button>
      <Output data={grades} showOutput={showOutput} />
    </div>
  );
};

export default App;

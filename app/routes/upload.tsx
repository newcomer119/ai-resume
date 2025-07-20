import React, { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";

const upload = () => {
  const [isProcessing, setisProcessing] = useState(true);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);


  const handleAnalyze = async({companyName, jobTitle, jobDescription, file} : {companyName : string, jobTitle : string, jobDescription : string, file : File}) => {
    setisProcessing(true)
  }


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const companyName = formData.get("CompanyName") as string;
    const jobTitle = formData.get("JobTitle") as string;
    const jobDescription = formData.get("JobDescription") as string;

    if(!file) return;

    handleAnalyze({companyName, jobTitle, jobDescription, file})

  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16 mt-8">
          <h1>Smart FeedBack for Your Job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>Drop Your Resume for an ATS score and imporvement tips </h2>
          )}
          {isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input type="text" name="CompanyName" placeholder="company name" />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input type="text" name="JobTitle" placeholder="job title" />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea rows={5} name="JobDescription" placeholder="Job Description" />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={setFile} />
              </div>
              <button className="primary-button" type="submit" disabled={!file}>
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;

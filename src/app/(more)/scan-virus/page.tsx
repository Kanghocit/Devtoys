"use client";

import Header from "@/common/Header";
import Button from "@/components/button";
import Upload from "@/components/upload";

import clsx from "clsx";

import { useState } from "react";

interface ScanResult {
  scan_results: {
    scan_all_result_i: number;
    total_detected_avs: number;
    total_avs: number;
    scan_details: {
      [key: string]: {
        threat_found: string;
        scan_result_i: number;
        def_time: string;
      };
    };
  };
  file_info: {
    file_size: number;
    file_type_extension: string;
    file_type_description: string;
    md5: string;
    sha1: string;
    sha256: string;
    upload_timestamp: string;
  };
}

const ScanVirus = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");

  const handleFileChange = (file: File) => {
    if (file) {
      const MAX_SIZE = 140 * 1024 * 1024; // MetaDefender giới hạn 140MB
      if (file.size > MAX_SIZE) {
        setError("File quá lớn. Giới hạn 140MB");
        return;
      }
      setFile(file);
      setError(null);
      setProgress("");
      setReport(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Vui lòng chọn file để quét");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setProgress("Đang tải file lên...");

      const formData = new FormData();
      formData.append("file", file);

      // Bước 1: Upload file và lấy data_id
      const uploadRes = await fetch("/api/scan-virus/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        throw new Error(errorData.error || "Lỗi khi tải file lên");
      }

      const uploadData = await uploadRes.json();
      const dataId = uploadData.data_id;

      if (!dataId) {
        throw new Error("Không nhận được ID quét");
      }

      // Bước 2: Kiểm tra kết quả quét
      let attempts = 0;
      const maxAttempts = 30; // Tối đa 30 lần kiểm tra (2.5 phút)

      while (attempts < maxAttempts) {
        setProgress(`Đang quét file...`);

        const reportRes = await fetch(`/api/scan-virus/report?id=${dataId}`);
        if (!reportRes.ok) {
          throw new Error("Lỗi khi lấy kết quả quét");
        }

        const reportData = await reportRes.json();

        // Kiểm tra nếu đã quét xong
        if (reportData.scan_results.progress_percentage === 100) {
          setReport(reportData);
          setProgress("");
          return;
        }

        // Chờ 5 giây trước khi kiểm tra lại
        await new Promise((resolve) => setTimeout(resolve, 5000));
        attempts++;
      }

      throw new Error(
        "Quá thời gian chờ kết quả quét (2.5 phút). Vui lòng thử lại sau."
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi không xác định");
    } finally {
      setIsLoading(false);
    }
  };

  const getThreatLevel = (result: number) => {
    switch (result) {
      case 0:
        return "An toàn";
      case 1:
        return "Đáng ngờ";
      case 2:
        return "Không mong muốn";
      case 3:
        return "Độc hại";
      default:
        return "Không xác định";
    }
  };

  const getThreatColor = (result: number) => {
    switch (result) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="flex flex-col rounded-2xl h-full p-2">
      <Header title="Quét Virus File" />
      <div className="flex flex-col gap-4 p-4">
        <Upload
          title="Chọn file để quét virus"
          onFileSelect={handleFileChange}
        />

        {file && (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <span className="text-sm">{file.name}</span>
            <Button
              onClick={handleUpload}
              disabled={isLoading}
              variant="primary"
              className=" text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "Đang quét..." : "Quét ngay"}
            </Button>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        {progress && (
          <div className="text-blue-500 text-sm bg-blue-50 p-3 rounded-md flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            {progress}
          </div>
        )}

        {report && (
          <div className="mt-4 bg-white p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Kết quả quét</h2>

            <div
              className={clsx(
                "mb-4 p-4 rounded-md",
                `bg-${getThreatColor(
                  report.scan_results.scan_all_result_i
                )}-50`,
                `text-${getThreatColor(
                  report.scan_results.scan_all_result_i
                )}-700`
              )}
            >
              <p className="text-lg font-semibold">
                {getThreatLevel(report.scan_results.scan_all_result_i)}
              </p>
              <p className="text-sm mt-1">
                Đã quét bởi {report.scan_results.total_avs} phần mềm diệt virus
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Thông tin file</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Loại file:</p>
                  <p>{report.file_info.file_type_description}</p>
                </div>
                <div>
                  <p className="text-gray-600">Kích thước:</p>
                  <p>{(report.file_info.file_size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
            </div>

            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600">
                Chi tiết quét
              </summary>
              <div className="mt-2 space-y-2">
                {Object.entries(report.scan_results.scan_details).map(
                  ([engine, detail]) => (
                    <div
                      key={engine}
                      className="p-2 bg-gray-50 rounded-md text-sm"
                    >
                      <p className="font-medium">{engine}</p>
                      {detail.threat_found ? (
                        <p className="text-red-600 text-xs mt-1">
                          Phát hiện: {detail.threat_found}
                        </p>
                      ) : (
                        <p className="text-green-600 text-xs mt-1">
                          Không phát hiện mối đe dọa
                        </p>
                      )}
                      <p className="text-gray-500 text-xs mt-1">
                        Cập nhật:{" "}
                        {new Date(detail.def_time).toLocaleDateString()}
                      </p>
                    </div>
                  )
                )}
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanVirus;

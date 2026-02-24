import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SessionCard from "@/components/SessionCard";
import Audience from "@/components/Audience";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-navy flex flex-col">
      <Navbar />
      <Hero />
      <About />

      <div id="agenda">
        <SessionCard
          id="part1"
          partNo="PART 01"
          title="Antigravity IDE: The Agent-First Environment"
          speakerName="Hoàng Trung"
          speakerRole="Chuyên gia đào tạo Phân tích dữ liệu & AI Automation"
          speakerAvatarPlaceholder="H"
          description="Khám phá Antigravity IDE - môi trường phát triển (IDE) dựa trên VS Code, tích hợp AI Agents tự hành có khả năng lập kế hoạch, viết code, kiểm thử và triển khai với các model như Gemini 3.1 Pro và Claude 4.6 Sonnet."
          agendaItems={[
            "Điều kiện kiên quyết & Yêu cầu phần cứng",
            "Tải xuống & Cài đặt Antigravity IDE",
            "Thiết lập lần đầu tiên & Giao diện IDE (Editor View vs Manager View)",
            "Cấu hình Agent: Chế độ phát triển (Auto, Turbo, Off)",
            "Cấu hình Nâng cao: Extensions, MCP tools, Skills & Workflows",
            "Live Demo & Thực hành: Xây dựng mini-project với AI Agents"
          ]}
          isReversed={false}
        />

        <SessionCard
          id="part2"
          partNo="PART 02"
          title="Advanced Claude Enterprise & Agent Ecosystem"
          speakerName="An Nguyễn"
          speakerRole="Enterprise AI Strategist"
          speakerAvatarPlaceholder="A"
          description="Từ ứng dụng Chatbot đến Hệ điều hành doanh nghiệp. Chuyển đổi phương thức làm việc với Claude Enterprise, tích hợp Institutional Memory (Bộ nhớ tổ chức) và phát triển Agentic Skills thông qua framework KWSR."
          agendaItems={[
            "Tiêu chuẩn Mới (The New Standard): Tại sao AI Coding Tools dành cho mọi Knowledge Workers",
            "Mastering Claude: Công thức Prompt 4 bước, Chaining, và XML tags",
            "Xây dựng AI Products: Mô hình Architect + Builder và tiến trình 7 bước",
            "Skills, Agents & Workflows: Triển khai framework KWSR và tích hợp MCP",
            "Lộ trình triển khai (Implementation Roadmap): Kế hoạch 90 ngày cho Doanh nghiệp"
          ]}
          isReversed={true}
        />
      </div>

      <Audience />
      <RegistrationForm />
      <Footer />
    </main>
  );
}

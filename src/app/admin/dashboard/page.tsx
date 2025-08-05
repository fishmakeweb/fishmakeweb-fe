"use client";

import { useAuth, withAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  BookOpen,
  User,
  Mail,
  Calendar,
  MessageSquare
} from "lucide-react";
import { useEffect, useState } from "react";
import { authService } from "@/lib/auth";

interface PendingEnrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseCode: string;
  courseName: string;
  status: string;
  requestDate: string;
  message?: string;
}

function AdminDashboard() {
  const { user } = useAuth();
  const [pendingEnrollments, setPendingEnrollments] = useState<PendingEnrollment[]>([]);
  const [allEnrollments, setAllEnrollments] = useState<PendingEnrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingEnrollment, setProcessingEnrollment] = useState<string | null>(null);
  const [adminMessages, setAdminMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      // Fetch pending enrollments
      const pendingResponse = await authService.authenticatedFetch(
        'https://localhost:7001/api/v1/enrollment/pending'
      );

      if (pendingResponse.ok) {
        const pendingResult = await pendingResponse.json();
        setPendingEnrollments(pendingResult.data || []);
      }

      // Fetch all enrollments
      const allResponse = await authService.authenticatedFetch(
        'https://localhost:7001/api/v1/enrollment'
      );

      if (allResponse.ok) {
        const allResult = await allResponse.json();
        setAllEnrollments(allResult.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnrollmentDecision = async (enrollmentId: string, isApproved: boolean) => {
    if (!user?.userId) return;

    setProcessingEnrollment(enrollmentId);
    try {
      const response = await authService.authenticatedFetch(
        `https://localhost:7001/api/v1/enrollment/${enrollmentId}/approve`,
        {
          method: 'PUT',
          body: JSON.stringify({
            adminId: user.userId,
            isApproved,
            adminMessage: adminMessages[enrollmentId] || ''
          }),
        }
      );

      if (response.ok) {
        await fetchEnrollments(); // Refresh the data
        setAdminMessages(prev => ({ ...prev, [enrollmentId]: '' }));
      } else {
        const result = await response.json();
        alert(result.message || 'Không thể xử lý yêu cầu');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi xử lý yêu cầu : ' + error);
    } finally {
      setProcessingEnrollment(null);
    }
  };

  const updateAdminMessage = (enrollmentId: string, message: string) => {
    setAdminMessages(prev => ({ ...prev, [enrollmentId]: message }));
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Đã duyệt</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="w-3 h-3 mr-1" />Từ chối</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="w-3 h-3 mr-1" />Chờ duyệt</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = {
    total: allEnrollments.length,
    pending: allEnrollments.filter(e => e.status.toLowerCase() === 'pending').length,
    approved: allEnrollments.filter(e => e.status.toLowerCase() === 'approved').length,
    rejected: allEnrollments.filter(e => e.status.toLowerCase() === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Quản lý yêu cầu đăng ký khóa học từ học viên</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng yêu cầu</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đã duyệt</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Từ chối</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Enrollments */}
        {pendingEnrollments.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                Yêu cầu chờ duyệt ({pendingEnrollments.length})
              </CardTitle>
              <CardDescription>Xem xét và phê duyệt các yêu cầu đăng ký mới</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {pendingEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="border rounded-lg p-6 bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="font-semibold">{enrollment.studentName}</span>
                          </div>
                          {getStatusBadge(enrollment.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{enrollment.studentEmail}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span>{enrollment.courseName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Ngày gửi: {new Date(enrollment.requestDate).toLocaleDateString('vi-VN')}</span>
                          </div>
                        </div>

                        {enrollment.message && (
                          <div className="bg-blue-50 p-3 rounded-md mb-4">
                            <div className="flex items-start gap-2">
                              <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-blue-900">Lời nhắn từ học viên:</p>
                                <p className="text-sm text-blue-800 italic">&quot;{enrollment.message}&quot;</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor={`message-${enrollment.id}`}>Ghi chú của admin (tùy chọn)</Label>
                          <Textarea
                            id={`message-${enrollment.id}`}
                            placeholder="Nhập ghi chú hoặc lý do quyết định..."
                            value={adminMessages[enrollment.id] || ''}
                            onChange={(e) => updateAdminMessage(enrollment.id, e.target.value)}
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        onClick={() => handleEnrollmentDecision(enrollment.id, true)}
                        disabled={processingEnrollment === enrollment.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {processingEnrollment === enrollment.id ? 'Đang xử lý...' : 'Duyệt'}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleEnrollmentDecision(enrollment.id, false)}
                        disabled={processingEnrollment === enrollment.id}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        {processingEnrollment === enrollment.id ? 'Đang xử lý...' : 'Từ chối'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle>Tất cả yêu cầu đăng ký</CardTitle>
            <CardDescription>Lịch sử tất cả các yêu cầu đăng ký khóa học</CardDescription>
          </CardHeader>
          <CardContent>
            {allEnrollments.length > 0 ? (
              <div className="space-y-4">
                {allEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium">{enrollment.studentName}</span>
                          {getStatusBadge(enrollment.status)}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{enrollment.studentEmail} • {enrollment.courseName}</p>
                          <p>Ngày gửi: {new Date(enrollment.requestDate).toLocaleDateString('vi-VN')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Chưa có yêu cầu đăng ký nào</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard, 'Admin');